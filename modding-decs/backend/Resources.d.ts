import { GameState, GameStateTransform } from "./GameState";
import { DataStore } from "./generic/DataStore";
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
export type ResourceData = {
    id: string;
    name: string;
    resourceInfo: ResourceInfo;
};
export declare const ExtraResources: DataStore<ResourceData>;
/**
 * If you register a resource, you will also need to have registered
 * a GameIcon with the same id as resourceId.toLowerCase().
 *
 * Warning: Implementing a resource is no easy feat.
 * Resources like Coins or Monstium should be easier to implement.
 * New "Essences" that can be channeled (i.e. for a new element)
 * are going to be difficult because there is a lot of behavior in-game
 * that is tied to the pre-existing Elements (things like Essence Storages,
 * or Storyline effects that grant Essence).
 */
export declare function registerResource(resourceId: string, resourceData: ResourceData): void;
export declare function getAllResources(): ResourceType[];
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
