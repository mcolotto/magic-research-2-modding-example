import { MR2Globals } from "magic-research-2-modding-sdk";

/**
 * This is a basic mod. It showcases how you can use Transformations
 * to change the effects of calculations done by the game.
 */
export function loadBasicTestMod(MR2: MR2Globals) {
  // This transformation will give a 200x multiplier to "Gather Mana".
  MR2.registerTransformation(
    // This argument is a list of sets of tags.
    // In most cases, the list will have a single set of tags.
    // In this case, we're saying that we want to modify the ActionEffect
    // of "gatherMana" - "gatherMana" is just the action ID.
    [[MR2.TransformationTags.ActionEffect, "gatherMana"]],
    // This ID needs to be unique or you will stomp on other Transformations
    "modTest1",
    // This name is displayed when the calculation is explained in a tooltip
    "Testing Mods",
    // The most commonly used types are Addition and Multiplier
    MR2.TransformationType.Multiplier,
    // Finally, the actual transformation. In this case it's an unconditional,
    // flat 200x multiplier.
    (state) => 200.0,
  );

  // This transformation will give a 200x multiplier to "Channel Fire"'s
  // channeling efficiency.
  MR2.registerTransformation(
    [[MR2.TransformationTags.ChannelingEfficiency, "channelFire"]],
    "modTest2",
    "Testing Mods",
    MR2.TransformationType.Multiplier,
    (state) => 200.0,
  );
}
