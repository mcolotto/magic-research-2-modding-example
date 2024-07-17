import { GameState } from "../../../GameState";
import { Resource } from "../../../Resources";
import { SpellElement } from "../../../spells/Elements";
import { Item, ItemParams } from "../../Item";
import { ItemTagEnum, TransmutationCategory } from "../../ItemTagEnum";
import { TransmutationSpell } from "../TransmutationSpell";
declare class MonstiumPaper extends Item {
    getId(): string;
    getTags(): ItemTagEnum[];
    getPicture(): any;
    getElement(): SpellElement;
    getBaseName(params: ItemParams): string;
    getDescription(state: GameState, params: ItemParams): string | undefined;
    getEffect(state: GameState, params: ItemParams): string | undefined;
    getBaseSalePrice(state: GameState, params: ItemParams): number;
}
export declare const monstiumPaper: MonstiumPaper;
declare class TransmuteMonstiumPaper extends TransmutationSpell {
    getItem(): Item;
    getCraftingElementLevelRequirements(): Partial<Record<SpellElement, number>>;
    canCraft(state: GameState): boolean;
    isVisible(state: GameState): boolean;
    getCraftingMaterialsBase(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    getElement(): SpellElement;
    getTransmutationCategory(): TransmutationCategory;
}
export declare const transmuteMonstiumPaper: TransmuteMonstiumPaper;
export {};
