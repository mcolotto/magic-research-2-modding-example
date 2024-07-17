import { GameState, GameStateTransform } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Item, ItemOccurrence, ItemStack } from "./Item";
export declare function isItemOccurrenceEqual(itemOccurrenceA: ItemOccurrence, itemOccurrenceB: ItemOccurrence): boolean;
export declare function getItemStackFromInventory(state: GameState, itemOccurrence: ItemOccurrence): ItemStack | null;
export declare const AddToInventoryForFirstTimeListeners: DataStore<GameStateTransform>;
export declare function addToInventory(itemOccurrence: ItemOccurrence, amount: number, state: GameState): GameState;
export declare function removeFromInventory(itemOccurrence: ItemOccurrence, amount: number, state: GameState): GameState;
export declare function getAmountOfItem(itemOccurrence: ItemOccurrence, state: GameState): number;
export declare function getTotalAmountOfItem(item: Item, state: GameState): number;
export declare function getTotalAmountOfItemWithMinimumQuality(item: Item, minimumQuality: number, state: GameState): number;
export declare function removeFromInventoryWithAnyParams(item: Item, amount: number, state: GameState): GameState;
export declare function removeFromInventoryWithMinimumQuality(item: Item, amount: number, minimumQuality: number, state: GameState): GameState;
export declare function toggleAutoCombineMaxItemId(state: GameState, itemId: string): GameState;
export declare function sortInventory(state: GameState): GameState;
export declare function loadInventoryListener(): void;
