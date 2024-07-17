import { ActionEffect, DoActionArgs } from "../../action/Action";
import { ActionArea, ActionSubcategory } from "../../action/ActionAreas";
import { SpellAutocastCategory } from "../../autocast/SpellAutocastCategory";
import { GameState } from "../../GameState";
import { Resource } from "../../Resources";
import { SpellElement } from "../Elements";
import { Spell } from "../Spell";
export declare abstract class BasicChannelingSpellBase extends Spell {
    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>>;
    getAutocastCategory(): SpellAutocastCategory;
    getBaseManaCost(state: GameState): number;
    getBaseEssenceEfficiency(): number;
    getManaCostProportion(): number;
    protected getBaseActionEffects(): Record<string, ActionEffect>;
    getEssencesToGrant(): Resource;
    getEssenceAmountToGrant(state: GameState): number;
    getTotalEssencesToGrant(state: GameState): Partial<Record<Resource, number>>;
    getDisplayEffect(state: GameState): string;
    isVisible(state: GameState): boolean;
    isEnabled(state: GameState, skipAffordabilityChecks?: boolean): boolean;
    getExpFromUsage(state: GameState): Partial<Record<SpellElement, number>>;
    doSpellAction(state: GameState, args: DoActionArgs): GameState;
    isCastingRecommended(state: GameState): boolean;
}
