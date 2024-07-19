import { GameState } from "../../GameState";
import { Item, ItemAction, ItemParams } from "../Item";
import { ItemTagEnum } from "../ItemTagEnum";
import { TransmutationSpell } from "../transmute/TransmutationSpell";
export declare abstract class ConsumableItem extends Item {
    abstract doConsumableItemEffect(state: GameState, params: ItemParams): GameState;
    getTags(): ItemTagEnum[];
    getCooldownSec(state: GameState): number;
    getCooldownLeftSec(state: GameState): number;
    getPrimaryAction(state: GameState, params: ItemParams): ItemAction | undefined;
    isActive(state: GameState): boolean;
}
export declare abstract class ConsumableTransmutationSpell extends TransmutationSpell {
    abstract getItem(): ConsumableItem;
    isVisible(state: GameState): boolean;
}
