import { GameState } from "../GameState";
export declare enum StorylineStatus {
    HIDDEN = "HIDDEN",
    LOCKED = "LOCKED",
    UNLOCKED = "UNLOCKED",
    HINT_REVEALED = "HINT_REVEALED",
    COMPLETED = "COMPLETED",
    BONUS_ACTIVE = "BONUS_ACTIVE"
}
export declare const STORYLINE_STATUS_ORDER: StorylineStatus[];
export declare function translateStorylineStatus(status: StorylineStatus): string;
export declare class Storyline {
    id: string;
    name: string;
    order: number;
    mindRequirementForHint: number;
    hintDescription: (state: GameState) => string;
    getBonusDescription: (state: GameState) => string;
    isHintUnlockable: (state: GameState) => boolean;
    isHidden?: (state: GameState) => boolean;
    _restoreBonus?: (state: GameState) => GameState;
    isBonusRestorable?: (state: GameState) => boolean;
    constructor(id: string, name: string, order: number, mindRequirementForHint: number, hintDescription: string | ((state: GameState) => string), getBonusDescription: string | ((state: GameState) => string), isHintUnlockable: (state: GameState) => boolean, isHidden?: (state: GameState) => boolean, restoreBonus?: (state: GameState) => GameState, isBonusRestorable?: (state: GameState) => boolean);
    getId(): string;
    getName(): string;
    getCompletedFlag(): string;
    isCompleted(state: GameState): boolean;
    isCompletedThisRun(state: GameState): boolean;
    isBonusActive(state: GameState): boolean;
    isHintRevealed(state: GameState): boolean;
    complete(state: GameState): GameState;
    activateBonus(state: GameState): GameState;
    revealHint(state: GameState): GameState;
    revealFullName(state: GameState): GameState;
    isFullNameRevealed(state: GameState): boolean;
    shouldRevealHint(state: GameState): boolean;
    getStatus(state: GameState): StorylineStatus;
    restoreBonus(state: GameState): GameState;
}
