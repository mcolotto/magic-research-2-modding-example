import { GameState } from "../GameState";
import { TemporaryEffect } from "./TemporaryEffect";
import { TemporaryEffectData } from "./TemporaryEffects";
declare class NoxiousCloak extends TemporaryEffect {
    getId(): string;
    getDisplayName(): string;
    getIcon(): any;
    getDisplayDescription(state: GameState, temporaryEffectData: TemporaryEffectData): string;
}
export declare const noxiousCloak: NoxiousCloak;
export declare function loadNoxiousCloak(): void;
export {};
