import { DoActionArgs } from "../../action/Action";
import { ActionArea, ActionSubcategory } from "../../action/ActionAreas";
import { SpellAutocastCategory } from "../../autocast/SpellAutocastCategory";
import { GameState } from "../../GameState";
import { Resource } from "../../Resources";
import { SpellElement, SpellElementType } from "../Elements";
import { Spell } from "../Spell";
import { BasicChannelingSpellBase } from "./BasicChannelingSpellBase";
export declare function getChannelingSpellForElement(element: SpellElementType): BasicChannelingSpellBase;
export declare function registerChannelingSpellForElement(element: SpellElementType, spell: BasicChannelingSpellBase): void;
declare class ChannelAll extends Spell {
    getId(): string;
    getSpellName(): string;
    getDisplayDescription(state: GameState): string;
    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>>;
    getAutocastCategory(): SpellAutocastCategory;
    getTags(): string[];
    getCost(state: GameState): {
        resources: Partial<Record<Resource, number>>;
        items: Record<string, number>;
    };
    getManaCost(state: GameState): number;
    getDisplayEffect(state: GameState): string;
    isVisible(state: GameState): boolean;
    isEnabled(state: GameState, skipAffordabilityChecks?: boolean): boolean;
    getLevelRequirements(): Partial<Record<SpellElement, number>>;
    getExpFromUsage(state: GameState): {};
    getTotalEssencesToGrant(state: GameState): Partial<Record<Resource, number>>;
    doSpellAction(state: GameState, args: DoActionArgs): GameState;
    isCastingRecommended(state: GameState): boolean;
    getElement(): SpellElementType | undefined;
    getBaseManaCost(state: GameState): number;
}
declare const _default: ChannelAll;
export default _default;
