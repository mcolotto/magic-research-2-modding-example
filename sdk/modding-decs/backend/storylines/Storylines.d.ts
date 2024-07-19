import { DataStore } from "../generic/DataStore";
import { Storyline } from "./Storyline";
export declare const Storylines: DataStore<Storyline>;
declare function _getSortedStorylines(): Storyline[];
export declare const getSortedStorylines: typeof _getSortedStorylines;
export declare const getTotalStorylineCount: () => number;
export declare const storylineHintUnlockChecker: (state: any) => any;
export {};
