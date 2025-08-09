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
  example?: string;
  translation?: string;
  type?: 'writing' | 'speaking' | 'common';
};

export type Vocabulary = {
  id: string;
  word: string;
  meaning: string;
  context?: string;
  type?: string;
};

export type StudyLevel = {
  title: string;
  description: string;
  lessons: Lesson[];
};

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
          type: v.type
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
