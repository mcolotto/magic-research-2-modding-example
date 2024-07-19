import { GameState, GameStateTransform } from "../GameState";
type TimeTickListener = (state: GameState, timeElapsedSec: number, isWarp: boolean) => GameState;
export declare function nextFrame(): Promise<unknown>;
/**
 *
 * @param id
 * @param listener
 * @param priority Default priority is 0. Higher values run later. Lower values run earlier.
 */
export declare function registerTimeTickListener(id: string, listener: TimeTickListener, priority?: number): void;
export declare function deleteTimeTickListener(id: string): void;
export declare function getAllTimeTickListenerIds(): string[];
export declare function processTimeTick(this: any, timeElapsedSec: number, isWarp: boolean): GameStateTransform;
export declare function setWarpTimeSecsPerTick(secsPerTick: number): void;
export declare function processOfflineTicks(initialState: GameState, secsTotal: number, lastProcessedTime: number, setPlayerState: (state: GameState) => void): Promise<void>;
export declare function processWarpTime(initialState: GameState, lastProcessedTime: () => number, onLoadingProgress: (secsProcessedSoFar: number, ticksTotal: number) => void, setPlayerState: (state: GameState) => void): Promise<void>;
export {};
