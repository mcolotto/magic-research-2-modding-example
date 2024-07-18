import { MR2Globals } from "../modding-decs/backend/modding/Modding";
import { loadBasicTestMod } from "./BasicTestMod";
import { loadBuffingPouchItemTestMod } from "./BuffingPouchItemTestMod";
import { loadEquippableWeaponTestMod } from "./EquippableWeaponTestMod";
import { loadSpellTestMod } from "./SpellTestMod";
import { loadStorylineAndBuildingTestMod } from "./StorylineAndBuildingTestMod";

const PACKAGE = require("../package.json");

// This function is the main function where you are going to load all the logic
// and content.
// The argument is the main way you have to interact with the MR2 backend,
// and contains a ton of functions and classes that will let you build your content.
// Check the TypeScript declaration to see what are all the different things you
// have.
export function load(MR2: MR2Globals) {
  loadBasicTestMod(MR2);
  loadBuffingPouchItemTestMod(MR2);
  loadEquippableWeaponTestMod(MR2);
  loadSpellTestMod(MR2);
  loadStorylineAndBuildingTestMod(MR2);
}

// The following fields are used by the game.
// It's best to take them from package.json if possible.

// This id is used as the main way to reference your mod in-game.
export const id = PACKAGE.name;
// The name is a human-readable name for your mod.
export const name = PACKAGE.description;
// Please follow the format [major].[minor].[patch]. The game internally
// assumes the version will be in this format to check for save
// compatibility.
export const version = PACKAGE.version;
// A description that could be shown in-game.
export const description =
  "A set of MR2 test mods to try out the modding feature.";
