import { MR2Globals } from "../modding-decs/backend/modding/Modding";
import { loadBasicTestMod } from "./BasicTestMod";
import { loadBuffingPouchItemTestMod } from "./BuffingPouchItemTestMod";
import { loadEquippableWeaponTestMod } from "./EquippableWeaponTestMod";
import { loadSpellTestMod } from "./SpellTestMod";
import { loadStorylineAndBuildingTestMod } from "./StorylineAndBuildingTestMod";

export function load(MR2: MR2Globals) {
  loadBasicTestMod(MR2);
  loadBuffingPouchItemTestMod(MR2);
  loadEquippableWeaponTestMod(MR2);
  loadSpellTestMod(MR2);
  loadStorylineAndBuildingTestMod(MR2);
}

export const name = "MR2 test mods";
