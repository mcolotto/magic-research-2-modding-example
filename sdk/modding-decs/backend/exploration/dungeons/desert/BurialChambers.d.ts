import { GameState } from "../../../GameState";
import { Enemy } from "../../enemies/Enemy";
import { DungeonFloor, ExplorationPossibility } from "../DungeonFloor";
declare class BurialChambers extends DungeonFloor {
    getId(): string;
    getFloorName(): string;
    getBoss(state: GameState): Enemy;
    getBreedingLevel(): number;
    isMainStoryDungeonFloor(): boolean;
    getExplorationRequiredTimeSecBase(): number;
    _getExplorationSuccessesForBossBase(): number;
    getMinimumMPLRecommendation(): number;
    getMaximumMPLRecommendation(): number | undefined;
    getBaseExplorationPossibilities(state: GameState): ExplorationPossibility[];
    getNextFloor(state: GameState): DungeonFloor;
    isUnlocked(state: GameState): boolean;
}
declare const _default: BurialChambers;
export default _default;
