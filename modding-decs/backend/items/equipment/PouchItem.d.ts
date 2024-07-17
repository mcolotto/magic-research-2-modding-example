import { GameState } from "../../GameState";
import { EquipmentSlot } from "../Equipment";
import { ItemAction, ItemParams } from "../Item";
import { EquippableItem } from "./EquippableItem";
export declare abstract class PouchItem extends EquippableItem {
    getSlot(): EquipmentSlot;
    abstract doPouchItemEffect(state: GameState, params: ItemParams): GameState;
    getPouchItemAction(state: GameState, index: number, params: ItemParams): ItemAction | undefined;
    doCleanup(state: GameState, params: ItemParams): GameState;
    shouldAutoUse(state: GameState, params: ItemParams): boolean;
    getUsesPerCombatBase(params: ItemParams): number;
    getUsesPerCombatTags: () => string[];
    getUsesPerCombat(state: GameState, params: ItemParams): number;
    getUsesPerCombatExplanation(state: GameState, params: ItemParams): string;
    shouldCombineUnderAutoCombineAll(): boolean;
}
export declare function hasUsedUpPouchItemThisCombat(state: GameState, index: number): boolean;
export declare function getUsesLeftForPouchItem(state: GameState, index: number): number;
export declare function loadPouch(): void;
