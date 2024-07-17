import { GameState } from "../../GameState";
import { Spell } from "../../spells/Spell";
import { AutocastCondition, AutocastConditionParameter } from "../AutocastCondition";
declare class SmartlyAutocastCondition extends AutocastCondition {
    getId(): string;
    getDisplayName(): string;
    getParameters(): AutocastConditionParameter[];
    getDisplayExplanation(state: GameState, values: string[]): string;
    isConditionMet(state: GameState, spell: Spell | undefined, values: string[]): boolean;
    validate(state: GameState, values: string[]): Record<number, string>;
}
declare const _default: SmartlyAutocastCondition;
export default _default;
