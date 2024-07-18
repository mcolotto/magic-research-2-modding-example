import { MD3Colors } from "react-native-paper/lib/typescript/src/types";
import { DataStore } from "../generic/DataStore";
import { SpellElementType } from "./Elements";
export type ElementData = {
    id: string;
    name: string;
    colors: (isDark: boolean) => MD3Colors;
};
export declare const ExtraElements: DataStore<ElementData>;
/**
 * Here be dragons!!!
 *
 * Adding a new SpellElement to the game is NoEasyFeat.
 * At the bare minimum you will need a GameIcon with the id value.
 *
 * If your goal is to have things like Channeling, Essence,
 * Essence Storage, etc. all apply to your new Element,
 * it might be easier to *replace* one of the existing Elements
 * with your proposed new Element.
 */
export declare function registerSpellElement(data: ElementData): void;
export declare function getAllElements(): SpellElementType[];
