import { MR2Globals } from "magic-research-2-modding-sdk";
import { loadBasicTestMod } from "./examples/BasicTestMod";
import { loadBuffingPouchItemTestMod } from "./examples/BuffingPouchItemTestMod";
import {
  loadElementCreationTestMod,
  preloadElementCreationTestMod,
} from "./examples/ElementCreationTestMod";
import { loadEnemyTestMod } from "./examples/EnemyTestMod";
import { loadEquippableWeaponTestMod } from "./examples/EquippableWeaponTestMod";
import { loadSpellTestMod } from "./examples/SpellTestMod";
import { loadStorylineAndBuildingTestMod } from "./examples/StorylineAndBuildingTestMod";
import { loadUITestMod } from "./examples/UITestMod";
import { loadWorldsMaxDifficultyTestMod } from "./examples/WorldsMaxDifficultyTestMod";

const PACKAGE = require("../package.json");

// This function is the main function where you are going to load all the logic
// and content.
// The argument MR2 is the main way you have to interact with the MR2 backend,
// and contains a ton of functions and classes that will let you build your content.
// Check the TypeScript declaration to see what are all the different things you
// have.
export function load(MR2: MR2Globals) {
  MR2.alert("Loading mod", "Beginning to load");

  loadBasicTestMod(MR2);
  loadBuffingPouchItemTestMod(MR2);
  loadEquippableWeaponTestMod(MR2);
  loadSpellTestMod(MR2);
  loadStorylineAndBuildingTestMod(MR2);
  loadEnemyTestMod(MR2);
  loadElementCreationTestMod(MR2);
  // loadElementOverrideTestMod(MR2);
  loadUITestMod(MR2);
  loadWorldsMaxDifficultyTestMod(MR2);
}

// In this function you will want to load things that could potentially affect
// the main game's content.
// The main purpose for this is to add new Elements or Resources.
export function preload(MR2: MR2Globals) {
  MR2.alert("Preloading mod", "Beginning to preload");
  preloadElementCreationTestMod(MR2);
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
