import { GameState, GameStateTransform } from "../GameState";
import { ItemAction, ItemOccurrence } from "./Item";
import { DataStore } from "../generic/DataStore";
export declare enum EquipmentSlot {
    Hand = "Hand",
    Body = "Body",
    Accessory = "Accessory",
    Pouch = "Pouch"
}
export declare function translateEquipmentSlot(slot: EquipmentSlot): string;
export declare function getMaxEquippedItemsPerSlot(state: GameState, slot: EquipmentSlot): number;
export declare function canUnequipItem(state: GameState, slot: EquipmentSlot, index: number): boolean;
export declare function canEquipItem(state: GameState, slot: EquipmentSlot, item: ItemOccurrence, searchForMaxQuality?: boolean): boolean;
export declare function hasItemWithAnyQuality(item: ItemOccurrence, state: GameState): boolean;
export declare const EquipmentChangeListeners: DataStore<(state: GameState) => GameState>;
export declare function equipToSlot(state: GameState, slot: EquipmentSlot, item: ItemOccurrence, position?: number, skipSave?: boolean, searchForMaxQuality?: boolean): GameState;
export declare function getEquippedItem(state: GameState, slot: EquipmentSlot, position?: number): ItemOccurrence | undefined;
export declare function getEquippedItems(state: GameState, slot: EquipmentSlot): ItemOccurrence[];
export declare function getEquippedExtraSlotItem(state: GameState, slot: EquipmentSlot, position?: number): ItemOccurrence | undefined;
export declare function unequipFromSlot(this: any, slot: EquipmentSlot, position: number, skipSave?: boolean): GameStateTransform;
export declare function getUnequipAction(state: GameState, slot: EquipmentSlot, position: number): ItemAction;
export declare function saveEquipmentLoadoutToPosition(state: GameState, position: number, name?: string): GameState;
export declare function loadEquipmentLoadoutFromPosition(state: GameState, position: number): GameState;
export declare function combineAll(state: GameState, onlyItemIds?: string | string[]): GameState;
export declare function sellLowQualityItems(state: GameState): GameState;
export declare function loadAutoCombineAll(): void;
