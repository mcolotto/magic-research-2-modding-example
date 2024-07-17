export declare const PARTIALLY_UNLOCKED_STORAGE_MULTIPLIER = 0.25;
export declare const PARTIALLY_UNLOCKED_CHANNELING_MULTIPLIER: number;
export declare const LEVELS_PER_RANK = 10;
export declare function getRankMultiplier(baseLevel: number, currentLevel: number): number;
export declare function getRankDifference(baseLevel: number, currentLevel: number): number;
export declare function loadElementMultipliers(): void;
