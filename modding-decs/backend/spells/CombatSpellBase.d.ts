import { ActionArea, ActionSubcategory } from "../action/ActionAreas";
import { GameState } from "../GameState";
import { Spell } from "./Spell";
export declare abstract class CombatSpellBase extends Spell {
    getAreas(): Partial<Record<ActionArea, ActionSubcategory[]>>;
    isVisible(state: GameState): boolean;
    canUseOutsideOfCombat(): boolean;
    isEnabled(state: GameState, skipAffordabilityChecks?: boolean): boolean;
}
