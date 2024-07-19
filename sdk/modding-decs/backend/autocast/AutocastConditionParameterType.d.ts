import { GameState } from "../GameState";
export type AutocastConditionParameterOption = {
    label: string;
    value: string;
};
export declare enum AutocastConditionParameterDisplay {
    TEXT_FIELD = "TEXT_FIELD",
    PICKER = "PICKER"
}
export declare abstract class AutocastConditionParameterType {
    abstract getDisplay(): AutocastConditionParameterDisplay;
    abstract getOptions(state: GameState): AutocastConditionParameterOption[];
    abstract validate(state: GameState, value: string): string | undefined;
}
