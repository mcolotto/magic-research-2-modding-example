import { GameState } from "../GameState";
import { TemporaryEffect } from "./TemporaryEffect";
import { TemporaryEffectData } from "./TemporaryEffects";
declare class PoisonImmunity extends TemporaryEffect {
    getId(): string;
    getDisplayName(): string;
    getIcon(): any;
    getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
}
export declare const poisonImmunity: PoisonImmunity;
export declare function loadPoisonImmunity(): void;
export {};
