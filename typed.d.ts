type HobbyType = {
    id: string;
    name: string;
    icon?: string;
    color? : string;
    emoji? : string
}

type LevelType = {
    id: string;
    name: string;
    icon? : string;
    description: string;
    timeCommitment: string;
}

type HobbyState = {
    selected: HobbyName | null;
    level: 'casual' | 'enthusiast' | 'pro' | string | null;
    hobbyDetails: HobbyType | null;
    levelDetails: LevelType | null;
    learningPath: any[];
    progress: Record<
      string,
      {
        completed: boolean;
        skipped: boolean;
        progress: number;
      }
    >;
  };