import { GameState, GameStateTransform } from "../GameState";
import { ActionEffect } from "../action/Action";
import { ItemTagEnum } from "./ItemTagEnum";
export type ItemTag = ItemTagEnum;
export declare function translateItemTag(tag: ItemTagEnum): string;
export interface ItemStack {
    itemOccurrence: ItemOccurrence;
    amount: number;
}
export type ItemParams = Record<string, any>;
export interface ItemOccurrence {
    itemId: string;
    params: ItemParams;
}
export interface ItemAction {
    id: string;
    description: string;
    isEnabled: boolean;
    requireConfirm?: boolean;
    isActive?: boolean;
    transform?: GameStateTransform;
}
export declare const INITIAL_MAX_ITEM_QUALITY = 15;
export declare function getMaxItemQuality(state: GameState): number;
export declare abstract class Item {
    constructor();
    abstract getId(): string;
    abstract getPicture(): any;
    abstract getBaseName(params: ItemParams): string;
    abstract getDescription(state: GameState, params: ItemParams): string | undefined;
    abstract getEffect(state: GameState, params: ItemParams): string | undefined;
    abstract getBaseSalePrice(state: GameState, params: ItemParams): number;
    getTags(): ItemTag[];
    getName(params: ItemParams): string;
    getDefaultName(): string;
    protected getBaseItemEffects(params: ItemParams): Record<string, ActionEffect>;
    getCachedBaseItemEffects: (params: ItemParams) => Record<string, ActionEffect>;
    isActive(state: GameState): boolean;
    _tags: string[] | undefined;
    getTransformationTags(): string[];
    tagsByEffect: Record<string, string[]>;
    getTagsByEffect(key: string, baseEffect: ActionEffect): string[];
    _itemOccurrenceCache: Record<string, ItemOccurrence>;
    getMemoizedItemOccurrence: (params: any) => ItemOccurrence;
    getItemEffect(state: GameState, params: ItemParams, effectId: string, neutralValue?: number): number;
    getItemEffects(state: GameState, params: ItemParams, onlyId?: string): Record<string, number>;
    explanationParams: (params: any, baseEffect: any) => {
        itemId: string;
        params: any;
        valueType: any;
        unit: any;
    };
    getItemEffectExplanations(state: GameState, params: ItemParams, onlyId?: string): Record<string, string>;
    getSalePrice(state: GameState, params: ItemParams, extraTags?: string[]): number;
    getPrimaryAction(_state: GameState, _params: ItemParams): ItemAction | undefined;
    getSellOneAction(state: GameState, params: ItemParams, extraTags?: string[]): ItemAction | undefined;
    getSaleActions(state: GameState, params: ItemParams): ItemAction[];
    getQuickbarAction(state: GameState, params: ItemParams): ItemAction | undefined;
    getCombineActions(state: GameState, params: ItemParams): ItemAction[];
    isItemQualityValid(params: ItemParams): boolean;
    getExtraActions(state: GameState, params: ItemParams): ItemAction[];
    getDefaultParams(): ItemParams;
    isIneffectiveInUniversal(): boolean;
    isEquippable(): boolean;
}
