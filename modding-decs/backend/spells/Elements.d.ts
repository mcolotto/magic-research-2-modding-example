import { GameState, GameStateTransform } from "../GameState";
export declare enum SpellElement {
    Fire = "Fire",
    Earth = "Earth",
    Water = "Water",
    Air = "Air",
    Poison = "Poison",
    Mind = "Mind",
    Life = "Life",
    Electric = "Electric",
    Death = "Death",
    Holy = "Holy",
    Time = "Time",
    Space = "Space"
}
export declare function translateElement(element: SpellElement): string;
export declare function getRankForLevel(level: number): string;
export declare const ELEMENT_LEVEL_CAP_BASE = 80;
export declare const ELEMENT_LEVEL_CAP_DEMO_BASE = 30;
export declare function getElementExp(state: GameState, element: SpellElement): number;
export declare function getMaxElementLevel(state: GameState): number;
export declare const getTotalExpRequiredForLevelByExponent: (level: number, exponent: number, maxLevel: number) => number;
export declare const getLevelByExpAndExponent: (exp: number, exponent: number, maxLevel: number, estimateLevel?: number) => number;
export declare function getIncrementalExpRequiredForLevel(state: GameState, level: number, element: SpellElement): number;
export declare function getTotalExpRequiredForLevel(state: GameState, level: number, element: SpellElement): number;
export declare function getElementLevel(state: GameState, element: SpellElement): number;
export declare const grantElementExp: (element: any, amount: any) => any;
export declare function getTotalElementExp(state: GameState): number;
export declare function selectPrimaryElement(this: any, element: string): GameStateTransform;
export declare function selectSecondaryElement(this: any, element: string): GameStateTransform;
export declare function getPrimaryElements(state: GameState): SpellElement[];
export declare function getPrimaryElementMaxLevelForRun(state: GameState): number;
export declare function getUnlockedElements(state: GameState): SpellElement[];
export declare function getFullyUnlockedElements(state: GameState): SpellElement[];
export declare function isPartiallyUnlocked(state: GameState, element: string): boolean;
export declare function unlockElement(this: any, element: string): GameStateTransform;
export declare function partiallyUnlockElement(this: any, element: string): GameStateTransform;
export declare function hasElementBeenPartiallyUnlockedInPreviousRun(state: GameState, element: SpellElement): boolean;
export declare function getMaxPrimaryElementLevel(state: GameState, element: SpellElement): number;
export declare function getMaxOfMaxPrimaryElementLevels(state: GameState): number;
export declare function getSumOfMaxPrimaryElementLevels(state: GameState): number;
export declare const MANA_SPENT_EXP_EXPONENT = 0.3;
export declare function getElementExpByUsage(state: GameState, element: SpellElement, level: number, manaSpent: number, isSpellElement: boolean, tags?: string[]): number;
export declare function startingExpForElement(state: GameState, element: SpellElement): number;
export declare function maximumElementLevelExpMultiplier(state: GameState): any;
export declare function maximumElementLevelProductionMultiplier(state: GameState, multiplier: number): number;
export declare function maximumElementLevelProductionMultiplierDx(state: GameState): any;
export declare function grantStartingExp(state: GameState): GameState;
export declare function meetsRequirements(state: GameState, requirements: Partial<Record<SpellElement, number>>): boolean;
