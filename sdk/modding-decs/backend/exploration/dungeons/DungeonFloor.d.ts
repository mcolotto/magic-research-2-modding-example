import { GameState, GameStateTransform } from "../../GameState";
import { Identifiable } from "../../generic/Identifiable";
import { Enemy } from "../enemies/Enemy";
export interface ExplorationPossibility {
    weight: number;
    transforms: ExplorationOutcome;
}
export interface ExplorationOutcome {
    enemy?: Enemy;
    normal: GameStateTransform;
    familiar: (state: GameState, familiarId: string) => GameState;
}
export declare function encounterEnemy(enemy: Enemy): ExplorationOutcome;
export declare abstract class DungeonFloor implements Identifiable {
    abstract getId(): string;
    abstract getFloorName(): string;
    getIdForTallyingClears(): string;
    getExplorationRequiredTimeSecBase(): number;
    _getExplorationSuccessesForBossBase(): number;
    getExplorationSuccessesForBoss(state: GameState): number;
    doExplore(state: GameState, isFromFamiliars: boolean, forcedRoll?: number | undefined): ExplorationOutcome | null;
    abstract getBoss(state: GameState): Enemy | undefined;
    abstract getBreedingLevel(): number;
    doFightBoss(state: GameState): GameStateTransform | undefined;
    canFightBoss(state: GameState): boolean;
    isUnlocked(state: GameState): boolean;
    getNextFloor(state: GameState): DungeonFloor | undefined;
    abstract isMainStoryDungeonFloor(): boolean;
    getMinimumMPLRecommendation(): number | undefined;
    getMaximumMPLRecommendation(): number | undefined;
    abstract getBaseExplorationPossibilities(state: GameState): ExplorationPossibility[];
    getExplorationPossibilities(state: GameState, isFromFamiliars: boolean): ExplorationPossibility[];
    isDangerousForFamiliar(state: GameState, familiarId: string): boolean;
    calculateAverageEnemyLevelForFamiliars(state: GameState): number;
}
