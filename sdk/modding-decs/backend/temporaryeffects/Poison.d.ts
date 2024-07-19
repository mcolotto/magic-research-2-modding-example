import { GameState } from "../GameState";
import { TemporaryEffect } from "./TemporaryEffect";
import { TemporaryEffectData } from "./TemporaryEffects";
declare class Poison extends TemporaryEffect {
    getId(): string;
    getDisplayName(): string;
    getIcon(): any;
    isBeneficial(): boolean;
    poisonDoTAmountTags: (target: any) => any[];
    getDamagePerSec(state: GameState, temporaryEffectData: TemporaryEffectData): number;
    getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
    mergeData(state: GameState, oldData: TemporaryEffectData, newData: TemporaryEffectData, mode: "add" | "replace"): TemporaryEffectData;
}
export declare const poison: Poison;
export declare function loadPoison(): void;
export {};
