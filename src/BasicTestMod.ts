import { MR2Globals } from "../modding-decs/backend/modding/Modding";

export function loadBasicTestMod(MR2: MR2Globals) {
  MR2.registerTransformation(
    [[MR2.TransformationTags.ActionEffect, "gatherMana"]],
    "modTest1",
    "Testing Mods",
    MR2.TransformationType.Multiplier,
    (state) => 200.0,
  );

  MR2.registerTransformation(
    [[MR2.TransformationTags.ChannelingEfficiency, "channelFire"]],
    "modTest2",
    "Testing Mods",
    MR2.TransformationType.Multiplier,
    (state) => 200.0,
  );
}
