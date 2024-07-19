import moment from "moment";
export declare enum RoundingMethod {
    DEFAULT = "DEFAULT",
    UP = "UP",
    DOWN = "DOWN"
}
export declare function formatNumber(num: number, options?: {
    showDecimals: boolean;
    roundingMethod?: RoundingMethod;
    extraPrecision?: boolean;
}): string;
export declare function formatMultiplier(ratio: number, options?: {
    showDecimals: boolean;
    roundingMethod?: RoundingMethod;
}): string;
export declare function formatTime(secs: number, options?: {
    shortForm: boolean;
    showDecimals: boolean;
}): string;
export declare function formatTimeLong(duration: moment.Duration): string;
