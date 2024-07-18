import { GameState, GameStateTransform } from "./GameState";
export type ResourceInfo = {
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
export type ResourceType = Resource | string;
export declare function translateResource(resource: ResourceType): string;
export declare function getResourceInfo(resource: ResourceType): ResourceInfo;
export declare function getSortedResourceKeys(state: GameState): string[];
export declare function registerResourceCapClearer(id: string, valueFn: (state: GameState) => any): void;
export declare function clearResourceCapCache(state: GameState): GameState;
export declare function explainResourceCap(state: GameState, resourceName: ResourceType): string;
export declare function getResourceCap(state: GameState, resourceName: ResourceType): number;
export declare function getResourceAmount(state: GameState, resource: ResourceType): any;
export declare function getCappedResourceAmount(state: GameState, resource: ResourceType): number;
export declare function isResourceCapped(state: GameState, resource: ResourceType): boolean;
export declare function hasEverHadResource(state: GameState, resource: ResourceType): boolean;
export declare function grantResourceOverCap(state: GameState, name: ResourceType, amount: number): GameState;
export declare function grantResource(this: any, name: ResourceType, amount: number): GameStateTransform;
export declare function loadResources(): void;
