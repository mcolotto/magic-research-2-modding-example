import { GameState, GameStateTransform } from "./GameState";
type ResourceInfo = {
    baseCap: number;
    icon: string;
};
export declare enum Resource {
    Mana = "Mana",
    FireEssence = "FireEssence",
    EarthEssence = "EarthEssence",
    WaterEssence = "WaterEssence",
    AirEssence = "AirEssence",
    PoisonEssence = "PoisonEssence",
    MindEssence = "MindEssence",
    LifeEssence = "LifeEssence",
    ElectricEssence = "ElectricEssence",
    DeathEssence = "DeathEssence",
    HolyEssence = "HolyEssence",
    TimeEssence = "TimeEssence",
    SpaceEssence = "SpaceEssence",
    Coins = "Coins",
    Monstium = "Monstium",
    TimePiece = "TimePiece"
}
export declare function translateResource(resource: Resource): string;
export declare function getResourceInfo(resource: Resource): ResourceInfo;
export declare function getSortedResourceKeys(state: GameState): Resource[];
export declare function registerResourceCapClearer(id: string, valueFn: (state: GameState) => any): void;
export declare function clearResourceCapCache(state: GameState): GameState;
export declare function explainResourceCap(state: GameState, resourceName: Resource): string;
export declare function getResourceCap(state: GameState, resourceName: Resource): number;
export declare function getResourceAmount(state: GameState, resource: Resource): number;
export declare function getCappedResourceAmount(state: GameState, resource: Resource): number;
export declare function isResourceCapped(state: GameState, resource: Resource): boolean;
export declare function hasEverHadResource(state: GameState, resource: Resource): boolean;
export declare function grantResourceOverCap(state: GameState, name: Resource, amount: number): GameState;
export declare function grantResource(this: any, name: Resource, amount: number): GameStateTransform;
export declare function loadResources(): void;
export {};
