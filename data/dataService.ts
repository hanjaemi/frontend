// Database types matching your MySQL schema
export type DifficultyFromDB = {
  difficulty_id: number;
  name: string;
  description: string;
  lesson_count: number;
};

export type LessonFromDB = {
  lesson_id: number;
  difficulty_id: number;
  title: string;
  description?: string;
  order_num: number;
};

export type VocabularyFromDB = {
  vocab_id: number;
  lesson_id: number;
  word: string;
  meaning: string;
  context: string;
  type: string;
};

export type GrammarFromDB = {
  grammar_id: number;
  lesson_id: number;
  title: string;
  description: string;
  example: string;
  translation: string;
  type: string;
};

// API Response types for the specific lesson endpoint
export type LessonApiResponse = {
  difficulty_id: number;
  lesson_id: number;
  grammars: {
    grammarId: number;
    lessonId: number;
    title: string;
    description: string;
    example: string;
    translation: string;
    type: string;
  }[];
  vocabs: {
    vocabId: number;
    lessonId: number;
    word: string;
    meaning: string;
    context: string;
    type: string;
  }[];
  exams: {
    examId: number;
    lessonId: number;
    question: string;
    options: string;
    correctAnswer: string;
  }[];
};

// Transformed types for the frontend
export type Difficulty = {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
};

export type Lesson = {
  id: string;
  number: number;
  title: string;
  description?: string;
  grammar: Grammar[];
  vocabulary: Vocabulary[];
};

export type Grammar = {
  id: string;
  title: string;
  description: string;
  descriptionKorean?: string;
  descriptionEnglish?: string;
  example?: string;
  examples?: string[];
  translation?: string;
  translations?: string[];
  type?: 'writing' | 'speaking' | 'common';
};

export type Vocabulary = {
  id: string;
  word: string;
  meaning: string;
  context?: string;
  type?: 'important' | 'common' | 'new';
};

export type StudyLevel = {
  title: string;
  description: string;
  lessons: Lesson[];
};

// Helper function to map API vocab types to frontend types
function mapVocabType(apiType: string): 'important' | 'common' | 'new' {
  switch (apiType.toLowerCase()) {
    case 'important':
    case 'top 100':
      return 'important';
    case 'rarely use':
    case 'new':
      return 'new';
    default:
      return 'common';
  }
}

// API service functions
export async function fetchDifficulties(): Promise<Difficulty[]> {
  try {
    const response = await fetch('/api/difficulties', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch difficulties');
    }
    
    const difficulties: DifficultyFromDB[] = await response.json();
    
    return difficulties.map(d => ({
      id: d.difficulty_id.toString(),
      title: d.name,
      description: d.description,
      lessonCount: d.lesson_count
    }));
  } catch (error) {
    console.error('Error fetching difficulties:', error);
    return [];
  }
}

export async function fetchLessonsForDifficulty(difficultyId: string): Promise<Lesson[]> {
  try {
    const [lessonsResponse, grammarResponse, vocabularyResponse] = await Promise.all([
      fetch(`/api/lessons/${difficultyId}`, { cache: 'no-store' }),
      fetch(`/api/grammar/${difficultyId}`, { cache: 'no-store' }),
      fetch(`/api/vocabulary/${difficultyId}`, { cache: 'no-store' })
    ]);

    if (!lessonsResponse.ok) {
      throw new Error('Failed to fetch lessons');
    }

    const lessons: LessonFromDB[] = await lessonsResponse.json();
    const grammar: GrammarFromDB[] = grammarResponse.ok ? await grammarResponse.json() : [];
    const vocabulary: VocabularyFromDB[] = vocabularyResponse.ok ? await vocabularyResponse.json() : [];

    return lessons.map(lesson => ({
      id: `lesson-${difficultyId}-${lesson.lesson_id}`,
      number: lesson.order_num || lesson.lesson_id,
      title: lesson.title,
      description: lesson.description,
      grammar: grammar
        .filter(g => g.lesson_id === lesson.lesson_id)
        .map(g => ({
          id: `grammar-${g.grammar_id}`,
          title: g.title,
          description: g.description,
          example: g.example,
          translation: g.translation,
          type: ['writing', 'speaking', 'common'].includes(g.type) 
            ? g.type as 'writing' | 'speaking' | 'common' 
            : 'common'
        })),
      vocabulary: vocabulary
        .filter(v => v.lesson_id === lesson.lesson_id)
        .map(v => ({
          id: `vocab-${v.vocab_id}`,
          word: v.word,
          meaning: v.meaning,
          context: v.context,
          type: mapVocabType(v.type)
        }))
    }));
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
}

export async function fetchStudyLevel(difficultyId: string): Promise<StudyLevel | null> {
  try {
    const [difficulties, lessons] = await Promise.all([
      fetchDifficulties(),
      fetchLessonsForDifficulty(difficultyId)
    ]);

    const difficulty = difficulties.find(d => d.id === difficultyId);
    
    if (!difficulty) {
      return null;
    }

    return {
      title: difficulty.title,
      description: difficulty.description,
      lessons: lessons
    };
  } catch (error) {
    console.error('Error fetching study level:', error);
    return null;
  }
}

// For backwards compatibility, create a mock-like structure
export const createMockLevels = async (): Promise<Record<string, StudyLevel>> => {
  try {
    const difficulties = await fetchDifficulties();
    const levels: Record<string, StudyLevel> = {};

    for (const difficulty of difficulties) {
      const studyLevel = await fetchStudyLevel(difficulty.id);
      if (studyLevel) {
        levels[difficulty.id] = studyLevel;
      }
    }

    return levels;
  } catch (error) {
    console.error('Error creating mock levels:', error);
    return {};
  }
};

// Helper function to safely parse JSON strings from API
function safeParseJSON(jsonString: string): string[] {
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [jsonString];
  } catch (error) {
    console.warn('Failed to parse JSON:', jsonString);
    return [jsonString];
  }
}

// Function to fetch all lessons for a difficulty
export async function fetchLessonsForDifficultyFromAPI(difficultyId: string): Promise<any[]> {
  try {
    const response = await fetch(`/api/lessons/${difficultyId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch lessons for difficulty');
    }
    
    const data = await response.json();
    // The API returns an array of lesson objects with lesson_id, grammars, vocabs, exams
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching lessons for difficulty:', error);
    return [];
  }
}

// Function to fetch specific lesson data from the API
export async function fetchLessonData(difficultyId: string, lessonId: string): Promise<Lesson | null> {
  try {
    const response = await fetch(`/api/lessons/${difficultyId}/${lessonId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch lesson data');
    }
    
    const data: LessonApiResponse = await response.json();
    
    // Transform the API response to match our frontend types
    return {
      id: `lesson-${difficultyId}-${lessonId}`,
      number: lessonId === "1" ? 1 : parseInt(lessonId),
      title: `Lesson ${lessonId}`, // You might want to get this from another API
      grammar: data.grammars.map(g => {
        const examples = safeParseJSON(g.example);
        const translations = safeParseJSON(g.translation);
        const descriptions = safeParseJSON(g.description);
        
                 return {
           id: `grammar-${g.grammarId}`,
           title: g.title,
           description: descriptions.length > 0 ? descriptions[0] : g.description,
           descriptionKorean: descriptions.length > 0 ? descriptions[0] : undefined,
           descriptionEnglish: descriptions.length > 1 ? descriptions[1] : undefined,
           examples: examples,
           translations: translations,
           // Keep single example/translation for backward compatibility
           example: examples.length > 0 ? examples[0] : g.example,
           translation: translations.length > 0 ? translations[0] : g.translation,
           type: ['writing', 'speaking', 'common'].includes(g.type) 
             ? g.type as 'writing' | 'speaking' | 'common' 
             : 'common'
         };
      }),
      vocabulary: data.vocabs.map(v => ({
        id: `vocab-${v.vocabId}`,
        word: v.word,
        meaning: v.meaning,
        context: v.context,
        type: mapVocabType(v.type)
      }))
    };
  } catch (error) {
    console.error('Error fetching lesson data:', error);
    return null;
  }
}
