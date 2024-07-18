import { DataStore } from "./generic/DataStore";
import { ResourceInfo, ResourceType } from "./Resources";
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
