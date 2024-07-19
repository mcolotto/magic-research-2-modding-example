import { GameState } from "../../GameState";
import { Item, ItemAction, ItemParams } from "../Item";
import { ItemTagEnum } from "../ItemTagEnum";
import { TransmutationSpell } from "../transmute/TransmutationSpell";
/**
 * A consumable item that requires a familiar.
 */
export declare abstract class FamiliarItem extends Item {
    abstract doFamiliarItemEffect(state: GameState, params: ItemParams, familiarId: string): GameState;
    canUseOnFamiliar(state: GameState, params: ItemParams, familiarId: string): boolean;
    getFamiliarAction(state: GameState, params: ItemParams, familiarId: string): ItemAction | undefined;
    getTags(): ItemTagEnum[];
    shouldConfirm(): boolean;
}
export declare abstract class FamiliarTransmutationSpell extends TransmutationSpell {
    abstract getItem(): FamiliarItem;
    isVisible(state: GameState): boolean;
}
