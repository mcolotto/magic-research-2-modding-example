import { GameState } from "./GameState";
export type RetirementListenerTransform = (state: GameState, isMock: boolean) => GameState;
export declare function registerRetirementListener(id: string, listener: RetirementListenerTransform): void;
export declare function registerPostRetirementListener(id: string, listener: RetirementListenerTransform, priority?: number): void;
export declare function isRetirementUnlocked(state: GameState): boolean;
export declare function retire(state: GameState, isMock: boolean): GameState;
