import { GameState } from "../../../../GameState";
import { Resource } from "../../../../Resources";
import { SpellElement, SpellElementType } from "../../../../spells/Elements";
import { EquipmentSlot } from "../../../Equipment";
import { ItemParams } from "../../../Item";
import { EquipmentTransmutationSpell } from "../../../transmute/EquipmentTransmutationSpell";
import { EquippableItem } from "../../EquippableItem";
declare class GoldenStaff extends EquippableItem {
    getId(): string;
    getSlot(): EquipmentSlot;
    getExtraSlots(): EquipmentSlot[];
    getPicture(): any;
    getBaseName(params: ItemParams): string;
    getDescription(state: GameState, params: ItemParams): string | undefined;
    getBaseSalePrice(state: GameState, params: ItemParams): number;
    getAttackBonusBase(params: ItemParams): number;
    getManaRegenBonusBase(params: ItemParams): number;
    getMaxManaBonusBase(params: ItemParams): number;
    getEffectExtra(state: GameState, params: ItemParams): string;
}
export declare const goldenStaff: GoldenStaff;
declare class TransmuteGoldenStaff extends EquipmentTransmutationSpell {
    getItem(): EquippableItem;
    getCraftingElementLevelRequirements(): Partial<Record<SpellElement, number>>;
    getCraftingMaterialsBase(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    getElement(): SpellElementType;
}
export declare const transmuteGoldenStaff: TransmuteGoldenStaff;
export {};
