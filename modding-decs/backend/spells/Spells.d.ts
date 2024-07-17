import { ActionArea, ActionSubcategory } from "../action/ActionAreas";
import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { TransformationTag } from "../transformation/Transformation";
import { SpellElement } from "./Elements";
import { Spell } from "./Spell";
declare const Spells: DataStore<Spell>;
export declare function registerSpell(spell: Spell): void;
export { Spells };
export declare function getAllSpellsByAscendingLevel(): Spell[];
export declare function getVisibleSpellsForArea(state: GameState, area: ActionArea): Partial<Record<ActionSubcategory, Spell[]>>;
export declare function getVisibleSpellsByElement(state: GameState, area?: ActionArea): Record<SpellElement, Spell[]>;
export declare function getVisibleSpellsForElement(state: GameState, element: SpellElement, area?: ActionArea, extraLevels?: number): Spell[];
export declare function getSpellsForElementThatCanBeLearnedSoon(state: GameState, element: SpellElement): Spell[];
export declare function getRecentSpellsCast(state: GameState): Spell[];
export declare function addRecentSpellCast(spell: Spell, state: GameState): GameState;
export declare function setLastCastedTime(spell: Spell, state: GameState): GameState;
export declare function getFavoriteSpells(state: GameState): Spell[];
export declare function addFavoriteSpell(state: GameState, spell: Spell): GameState;
export declare function removeFromFavoriteSpells(state: GameState, spell: Spell): GameState;
export declare function isInFavoriteSpells(state: GameState, spell: Spell): boolean;
export declare function toggleEmpowered(state: GameState, spell: Spell): GameState;
export declare function registerSpellCacheClearedListener(fn: (state: GameState) => GameState): void;
export declare function clearAutocastPointsCache(state: GameState): GameState;
export declare function registerAutocastPointsClearer(id: string, valueFn: (state: GameState) => any): void;
export declare function clearManaCostCache(state: GameState): GameState;
export declare function registerManaCostClearer(id: string, valueFn: (state: GameState) => any): void;
export declare function clearCanCastSpellCache(state: GameState): GameState;
export declare function registerCanCastSpellClearer(id: string, valueFn: (state: GameState) => any): void;
export declare function clearSpellCooldownCache(state: GameState): GameState;
export declare function registerSpellCooldownClearer(id: string, valueFn: (state: GameState) => any): void;
export declare function clearSpellDurationCache(state: GameState): GameState;
export declare function clearAllSpellCaches(state: GameState): GameState;
export declare function registerEmpowerEffects(spell: Spell, tags: TransformationTag[], multiplier: number): void;
export declare function registerStandardEmpowerEffects(spell: Spell, actionEffectMultiplier: number, manaCostMultiplier: number): void;
export declare function registerBuffEmpowerEffects(spell: Spell, effectMagnitudeMultiplier: number, manaCostMultiplier: number): void;
