import { GameState } from "../../../GameState";
import { AutocastConditionParameterDisplay, AutocastConditionParameterOption, AutocastConditionParameterType } from "../../AutocastConditionParameterType";
export declare class TemporaryEffectAutocastConditionParameterType extends AutocastConditionParameterType {
    getDisplay(): AutocastConditionParameterDisplay;
    getOptions(state: GameState): AutocastConditionParameterOption[];
    validate(state: GameState, value: string): string | undefined;
}
