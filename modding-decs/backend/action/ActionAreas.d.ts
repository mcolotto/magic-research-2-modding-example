import { ItemTagEnum } from "../items/ItemTagEnum";
import { SpellElement } from "../spells/Elements";
export declare enum ActionArea {
    HOME = "HOME",
    SPELL_MENU = "SPELL_MENU",
    STUDY = "STUDY",
    TRANSMUTE = "TRANSMUTE",
    EXPLORATION = "EXPLORATION",
    ENHANCEMENT = "ENHANCEMENT",
    BOOST = "BOOST",
    FAMILIARS = "FAMILIARS"
}
export declare enum ActionSubcategories {
    ACTIONS = "ACTIONS",
    CHANNELING = "CHANNELING",
    MANA = "MANA",
    STORAGE = "STORAGE",
    CATALYSTS = "CATALYSTS",
    OTHER = "OTHER",
    TIME_PIECES = "TIME_PIECES",
    ENHANCE_STORAGE = "ENHANCE_STORAGE",
    ENHANCE_LAND = "ENHANCE_LAND",
    ENHANCE_PRODUCTION = "ENHANCE_PRODUCTION",
    ENHANCE_CATALYSTS = "ENHANCE_CATALYSTS",
    ENHANCE_EXPLORATION = "ENHANCE_COMBAT",
    ENHANCE_OTHER = "ENHANCE_OTHER",
    BOOST = "BOOST",
    BOOST_OTHER = "BOOST_OTHER",
    FAMILIARS = "FAMILIARS"
}
export type ActionSubcategory = ActionSubcategories | SpellElement | ItemTagEnum;
export declare function getSubcategoriesByArea(area: ActionArea): ActionSubcategories[];
export declare function translateActionArea(area: ActionArea): string;
export declare function translateActionSubcategory(subcategory: ActionSubcategories): string;
