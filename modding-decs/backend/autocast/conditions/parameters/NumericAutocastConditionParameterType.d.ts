import { GameState } from "../../../GameState";
import { AutocastConditionParameterDisplay, AutocastConditionParameterOption, AutocastConditionParameterType } from "../../AutocastConditionParameterType";
export declare class NumericAutocastConditionParameterType extends AutocastConditionParameterType {
    private min;
    private max;
    constructor(min: number | undefined, max: number | undefined);
    getDisplay(): AutocastConditionParameterDisplay;
    getOptions(state: GameState): AutocastConditionParameterOption[];
    validate(state: GameState, value: string): string | undefined;
}
