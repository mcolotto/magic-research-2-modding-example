import { GameState } from "../../GameState";
import { Resource } from "../../Resources";
import { DoActionArgs } from "../../action/Action";
import { ActionArea, ActionSubcategory } from "../../action/ActionAreas";
import { SpellAutocastCategory } from "../../autocast/SpellAutocastCategory";
import { SpellElement } from "../../spells/Elements";
import { Spell } from "../../spells/Spell";
import { Item, ItemParams } from "../Item";
import { TransmutationCategory } from "../ItemTagEnum";
export declare abstract class TransmutationSpell extends Spell {
    abstract getItem(): Item;
    getId(): string;
    getAutocastCategory(): SpellAutocastCategory;
    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>>;
    getExtraTags(): string[];
    getSpellName(): string;
    getDisplayName(state: GameState): string;
    getCost(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    isTransmutationSpell(): boolean;
    generateCraftedParams(state: GameState): ItemParams;
    getLevelRequirements(): Partial<Record<SpellElement, number>>;
    abstract getCraftingElementLevelRequirements(): Partial<Record<SpellElement, number>>;
    simplifyCrafting(): boolean;
    abstract getCraftingMaterialsBase(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    tagsForResource: (resource: any) => any[];
    tagsForItem: (item: any) => any[];
    tagsForQuality: () => string[];
    tagsForCreation: () => string[];
    getCraftingMaterials(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    getDisplayDescription(state: GameState): string;
    getDisplayEffect(state: GameState): string;
    doSpellAction(state: GameState, args: DoActionArgs): GameState;
    canAfford(state: GameState): boolean;
    hasCraftingMaterials(state: GameState): boolean;
    canCraft(state: GameState): boolean;
    getBaseManaCost(state: GameState): number;
    isVisible(state: GameState): boolean;
    getExpFromUsage(state: GameState): Partial<Record<SpellElement, number>>;
    doAction(args: DoActionArgs, state: GameState): GameState;
    calculateAmountPerCraft(state: GameState, args: DoActionArgs): number;
    craftN(state: GameState, args: DoActionArgs, n: number): GameState;
    craftMax(state: GameState): GameState;
    craftWithIntermediate(state: GameState, n: number): {
        state: GameState;
        timesCrafted: number;
    };
    isCraftIntermediatePossible(state: GameState, n?: number): boolean;
    isCraftIntermediatePotentiallyPossible(state: GameState): boolean;
    timesCraftable(state: GameState): number;
    protected shouldIgnoreCanCastSpell(): boolean;
    getTransmutationCategory(): TransmutationCategory | null;
}
export declare function isTransmutationUnlocked(state: GameState): boolean;
export declare function registerTransmutationSpellAndItem(spell: TransmutationSpell): void;
export declare function getTransmutationSpellForItem(item: Item): TransmutationSpell | undefined;
export declare function getVisibleTransmutationSpells(state: GameState): TransmutationSpell[];
export declare function getAllTransmutationSpellsEverCastable(state: GameState): TransmutationSpell[];
