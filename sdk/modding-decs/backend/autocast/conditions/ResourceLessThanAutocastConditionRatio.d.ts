import { GameState } from "../../GameState";
import { Spell } from "../../spells/Spell";
import { AutocastCondition, AutocastConditionParameter } from "../AutocastCondition";
declare class ResourceLessThanAutocastConditionRatio extends AutocastCondition {
    getId(): string;
    getDisplayName(): string;
    getParameters(): AutocastConditionParameter[];
    getDisplayExplanation(state: GameState, values: string[]): string;
    isConditionMet(state: GameState, spell: Spell | undefined, values: string[]): boolean;
}
declare const _default: ResourceLessThanAutocastConditionRatio;
export default _default;
