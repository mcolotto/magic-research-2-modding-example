import { GameState } from "../GameState";
import { DataStore } from "../generic/DataStore";
import { Identifiable } from "../generic/Identifiable";
import { Resource } from "../Resources";
export type IncomeOverTimeCalculator = (state: GameState) => Partial<Record<Resource, number>>;
export declare class IncomeOverTimeProducer implements Identifiable {
    id: string;
    displayName: string;
    calculator: IncomeOverTimeCalculator;
    constructor(id: string, displayName: string, calculator: IncomeOverTimeCalculator);
    getId(): string;
    getDisplayName(): string;
    getCalculator(): IncomeOverTimeCalculator;
}
declare const IncomeOverTimeProducers: DataStore<IncomeOverTimeProducer>;
export declare function clearCalculatedIncomeCache(state: GameState): GameState;
export declare function calculateIncomePerSecond(state: GameState): Partial<Record<Resource, number>>;
export declare function explainIncomePerSecondPreTransform(state: GameState): Partial<Record<Resource, {
    displayName: string;
    income: number;
}[]>>;
export declare function explainIncomePerSecText(state: GameState): Partial<Record<Resource, string>>;
export { IncomeOverTimeProducers };
