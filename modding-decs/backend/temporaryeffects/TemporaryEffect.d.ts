import { CombatStat } from "../exploration/CombatStats";
import { GameState } from "../GameState";
import { Identifiable } from "../generic/Identifiable";
import { TransformationType } from "../transformation/Transformation";
import { TemporaryEffectData } from "./TemporaryEffects";
export declare abstract class TemporaryEffect implements Identifiable {
    abstract getId(): string;
    abstract getDisplayName(): string;
    abstract getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
    getParameterlessDisplayDescription(state: GameState): string;
    isCommonBuffEnabled(): {
        stat: CombatStat;
        type: TransformationType;
    }[];
    getIcon(): any;
    isBeneficial(): boolean;
    isCombatOnly(): boolean;
    isDispellable(): boolean;
    isHidden(): boolean;
    mergeData(state: GameState, oldData: TemporaryEffectData, newData: TemporaryEffectData, mode: "add" | "replace"): TemporaryEffectData;
}
