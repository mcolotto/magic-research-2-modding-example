import { ResourceType } from "../../Resources";
import { SpellElementType } from "../Elements";
export declare const getResourceForElement: (element: SpellElementType) => any;
export declare const getElementForResource: (resource: ResourceType) => any;
export declare function registerExtraElementToResourceMapping(element: SpellElementType, resource: ResourceType): void;
