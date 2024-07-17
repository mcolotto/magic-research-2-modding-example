import { GameState, GameStateTransform } from "../../GameState";
import { Identifiable } from "../../generic/Identifiable";
import { TransformationTags } from "../../transformation/TransformationTags";
import { CombatStat } from "../CombatStats";
export interface BattlerStats {
    maxHP: number;
    attack: number;
    attackDelay: number;
    defense: number;
    accuracy: number;
    dodge: number;
    crit: number;
}
export interface BattlerAction {
    name: string;
    delay: number;
    transform: GameStateTransform;
}
export interface EnemyLoot {
    itemId: string;
    chance: number;
    amount: number;
    params?: any;
}
export declare enum BestiaryState {
    Hidden = "Hidden",
    Basic = "Basic",
    Expanded = "Expanded",
    Loot = "Loot"
}
export declare function getCombatStatFromBattlerStat(battlerStat: string): CombatStat;
export declare function getCumulativeEnemyKillsGlobal(state: GameState, enemyId: string): number;
export declare function getCumulativeEnemyKillsWorld(state: GameState, enemyId: string): number;
export declare function getCumulativeEnemyKillsFromCreaturesGlobal(state: GameState, enemyId: string): number;
export declare function getCumulativeEnemyKillsFromCreaturesWorld(state: GameState, enemyId: string): number;
export declare function getBestiaryVisibleEnemies(state: GameState): Enemy[];
export declare function isBestiaryUnlocked(state: GameState): boolean;
export declare const KILLS_FOR_EXPANDED_BESTIARY = 10;
export declare const KILLS_FOR_BESTIARY_LOOT = 50;
export declare abstract class Enemy implements Identifiable {
    abstract getId(): string;
    abstract getName(): string;
    abstract getBaseStats(): BattlerStats;
    abstract getPicture(state: GameState): any;
    abstract getLevel(): number;
    getMaxHP(state: GameState): number;
    getAttack(state: GameState): number;
    getAttackDelay(state: GameState): number;
    getCriticalPoints(state: GameState): number;
    getDefense(state: GameState): number;
    getAccuracyPoints(state: GameState): number;
    getDodgePoints(state: GameState): number;
    getNextAction(state: GameState): BattlerAction;
    abstract getCoinsAwardedBase(state: GameState): number;
    abstract getMonstiumAwardedBase(state: GameState): number;
    getItemsAwardedBase(state: GameState): EnemyLoot[];
    isBoss(): boolean;
    getBackdropColor(state: GameState): string | undefined;
    getBestiaryState(state: GameState): BestiaryState;
    lootTags: (isFromCreatures: any, resource: any) => any[];
    lootChanceTags: (isFromCreatures: any) => TransformationTags[];
    onEncounter(state: GameState): GameState;
    onPlayerDeath(state: GameState): GameState;
    _enemyIdParams: {
        enemyId: string;
    };
    _familiarParams: (familiarId: string) => {
        familiarId: string;
        enemyId: string;
    };
    onDeath(state: GameState, isFromFamiliars: boolean, familiarId?: string): GameState;
    _memoizedEnemyLootTags: (enemyLootId: string, isFromFamiliars: boolean) => string[];
    getTips(): string | undefined;
}
