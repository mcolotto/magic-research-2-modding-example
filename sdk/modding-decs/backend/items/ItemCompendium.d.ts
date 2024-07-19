import { Enemy } from "../exploration/enemies/Enemy";
import { GameState } from "../GameState";
import { Item } from "./Item";
import { TransmutationSpell } from "./transmute/TransmutationSpell";
export type ItemCompendiumLootInfo = {
    enemy: Enemy;
    lootChance: number | undefined;
    amount: number | undefined;
};
export type ItemCompendiumInfo = {
    item: Item;
    transmuteSpell: TransmutationSpell | undefined;
    knownLootFromEnemies: ItemCompendiumLootInfo[];
    salePrice: number;
};
export declare function getItemCompendiumInfoForItem(state: GameState, itemId: string): ItemCompendiumInfo;
export declare function getAllKnownItemCompendiumInfos(state: GameState): ItemCompendiumInfo[];
export declare function loadCompendium(): void;
