export interface Identifiable {
    getId(): string;
}
export declare function isIdentifiable(value: any): value is Identifiable;
export declare function idOf(obj: Identifiable): string;
