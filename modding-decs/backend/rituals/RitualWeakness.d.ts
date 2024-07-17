import { GameState } from "../GameState";
import { TemporaryEffect } from "../temporaryeffects/TemporaryEffect";
import { TemporaryEffectData } from "../temporaryeffects/TemporaryEffects";
declare class RitualWeakness extends TemporaryEffect {
    getId(): string;
    getDisplayName(): string;
    getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
    getIcon(): any;
    isDispellable(): boolean;
    isCombatOnly(): boolean;
    isBeneficial(): boolean;
}
export declare const ritualWeakness: RitualWeakness;
export declare function loadRitualWeakness(): void;
export {};
