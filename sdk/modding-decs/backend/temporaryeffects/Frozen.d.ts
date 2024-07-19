import { GameState } from "../GameState";
import { TemporaryEffect } from "./TemporaryEffect";
import { TemporaryEffectData } from "./TemporaryEffects";
declare class Frozen extends TemporaryEffect {
    getId(): string;
    getDisplayName(): string;
    isBeneficial(): boolean;
    getIcon(): any;
    getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
}
export declare const frozen: Frozen;
declare class FrozenProtection extends TemporaryEffect {
    getId(): string;
    getDisplayName(): string;
    isBeneficial(): boolean;
    getIcon(): any;
    isDispellable(): boolean;
    getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
}
export declare const frozenProtection: FrozenProtection;
export declare function loadFrozen(): void;
export {};
