import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Identifiable } from "../generic/Identifiable";
import { Spell } from "../spells/Spell";
import { AutocastConditionParameterType } from "./AutocastConditionParameterType";
export type AutocastConditionParameter = {
    parameterType: AutocastConditionParameterType;
    name: string;
};
export declare abstract class AutocastCondition implements Identifiable {
    abstract getId(): string;
    abstract getDisplayName(): string;
    abstract getParameters(): AutocastConditionParameter[];
    abstract getDisplayExplanation(state: GameState, values: string[]): string;
    abstract isConditionMet(state: GameState, spell: Spell | undefined, values: string[]): boolean;
    validate(state: GameState, values: string[]): Record<number, string>;
}
export declare const AutocastConditions: DataStore<AutocastCondition>;
