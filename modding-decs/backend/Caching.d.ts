import { GameState, GameStateTransform } from "./GameState";
import { SpellElement } from "./spells/Elements";
export declare function cacheByTickCount(state: GameState, key: string, valueFn: (state: GameState) => any, readCacheOnly?: boolean): any;
export declare function cacheByTickCountElementLevel(state: GameState, key: SpellElement, valueFn: (state: GameState) => any, readCacheOnly?: boolean): any;
export declare function cacheBySecondsPlayed(state: GameState, key: string, valueFn: (state: GameState) => any, readCacheOnly?: boolean): any;
export declare function cacheByArbitraryVersion(state: GameState, key: string, valueFn: (state: GameState) => any, versionFn: (state: GameState) => any, readCacheOnly?: boolean): any;
export declare function cacheBooleanTrueOnly(state: GameState, key: string, valueFn: (state: GameState) => boolean, readCacheOnly?: boolean): any;
/**
 * This cache is cleared on retirement
 */
export declare function cacheIndefinitely(state: GameState, keyFn: (state: GameState) => string, valueFn: (state: GameState) => any): any;
export declare function clearCacheKey(state: GameState, keyFn: (state: GameState) => string): GameState;
export declare function clearAllCaches(state: GameState): GameState;
export declare function registerClearCacheListener(id: string, fn: GameStateTransform): void;
