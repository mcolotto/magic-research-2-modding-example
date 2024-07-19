import { DungeonEventGroup } from "../../events/DungeonEventGroup";
import { GameState } from "../../GameState";
import { Identifiable } from "../../generic/Identifiable";
import { DungeonFloor } from "./DungeonFloor";
export declare abstract class Dungeon implements Identifiable {
    abstract getId(): string;
    abstract getName(): string;
    abstract getDungeonFloors(): DungeonFloor[];
    abstract isUnlocked(state: GameState): boolean;
    getDungeonEventGroup(): DungeonEventGroup;
    hasTriggeredEvent(state: GameState): boolean;
}
