export declare class DataStore<T> {
    store: Record<string, T>;
    numericIds: Record<string, number>;
    maxId: number;
    register(value: T, overrideId?: string): void;
    getById(id: string): T;
    getByIdNullable(id: string): T | undefined;
    getNumericId(id: string): number | undefined;
    getAll(): T[];
    reset(): void;
}
