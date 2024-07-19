import { GameState } from "../GameState";
import { TemporaryEffect } from "./TemporaryEffect";
import { TemporaryEffectData } from "./TemporaryEffects";
declare class WizardDisarray extends TemporaryEffect {
    getId(): string;
    getDisplayName(): string;
    getIcon(): any;
    isBeneficial(): boolean;
    getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
}
export declare const wizardDisarray: WizardDisarray;
export declare function loadWizardDisarray(): void;
export {};
