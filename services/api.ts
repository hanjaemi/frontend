interface GrammarItem {
  id: string;
  title: string;
  description: string;
  type: "writing" | "speaking" | "common";
  timestamp?: string;
}

interface VocabularyItem {
  id: string;
  word: string;
  meaning: string;
  type: "important" | "common" | "new";
  timestamp: string;
}

interface StudyData {
  grammar: GrammarItem[];
  vocabulary: VocabularyItem[];
}

export async function getStudyData(id: string): Promise<StudyData> {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/grammar-and-vocabulary/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch study data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching study data:", error);
    throw error;
  }
}
