import { DataStore } from "../generic/DataStore";
import { SpellElementType } from "./Elements";
export type ElementData = {
    id: string;
    name: string;
};
export declare const ExtraElements: DataStore<ElementData>;
/**
 * Here be dragons!!!
 *
 * Adding a new SpellElement to the game is NoEasyFeat.
 * At the bare minimum you will need a GameIcon with the id value.
 */
export declare function registerSpellElement(data: ElementData): void;
export declare function getAllElements(): SpellElementType[];
