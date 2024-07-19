import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Item } from "./Item";
declare const Items: DataStore<Item>;
export { Items };
export declare function isInventoryUnlocked(state: GameState): boolean;
export declare function isInventoryEverUnlocked(state: GameState): boolean;
export declare function isCraftingUnlocked(state: GameState): boolean;
export declare function isItemQualityUnlocked(state: GameState): boolean;
export declare function hasEverUnlockedCrafting(state: GameState): boolean;