import { AttackTarget } from "../exploration/AttackTarget";
import { CombatStat } from "../exploration/CombatStats";
import { GameState } from "../GameState";
import { Resource } from "../Resources";
import { SpellElement } from "../spells/Elements";
import { TransformationTags } from "./TransformationTags";
export declare enum TransformationType {
    Addition = "Addition",
    Multiplier = "Multiplier",
    Power = "Power",
    Override = "Override"
}
export type TransformationTag = TransformationTags | Resource | SpellElement | CombatStat | AttackTarget | string;
export type Transformation = (state: GameState, params: Record<string, any>, previousValue: number) => number | undefined;
export type TransformationData = {
    id: string;
    description: string;
    transformation: Transformation;
    type: TransformationType;
    tags: TransformationTag[][];
    lastValue: number | undefined;
};
export declare function registerTransformation(tags: TransformationTag[][], transformationId: string, transformationDescription: string, transformationType: TransformationType, transformation: Transformation): void;
export declare function applyMultiplierTransformations(tags: TransformationTag[], state: GameState, startingValue: number, params?: Record<string, any>): number;
export declare function applyTransformations(tags: TransformationTag[], state: GameState, startingValue: number, params?: Record<string, any>, joinedTags?: string): number;
export declare function applyTransformationsCached(tags: TransformationTag[], state: GameState, startingValue: number, params?: Record<string, any>): number;
export declare function applyTransformationsPermaCached(tags: TransformationTag[], state: GameState, startingValue: number, params?: Record<string, any>): number;
export declare function clearTransformationCache(tags: Set<TransformationTag>, state: GameState): GameState;
export declare function explainTransformations(tags: TransformationTag[], state: GameState, startingValue: number, params?: Record<string, any>): Record<TransformationType, Array<{
    id: string;
    description: string;
    value: number | undefined;
}>>;
export declare function explainTransformationsText(tags: TransformationTag[], state: GameState, startingValue: number, params?: Record<string, any>): string;
export declare function explainTransformationsTextUncached(tags: TransformationTag[], state: GameState, startingValue: number, params?: Record<string, any>): string;
