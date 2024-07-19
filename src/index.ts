// DO NOT MODIFY - Begin
// Any change to the values provided in MR2 cannot be done without changing
// the game's version number.
// This value will be taken from the SDK itself and used as a parameter in-game
// to make sure the mod's version supports the game's version.
export const minGameVersion =
  require("magic-research-2-modding-sdk").minGameVersion;
// DO NOT MODIFY - End

const {
  load,
  preload,
  id,
  name,
  version,
  description,
} = require("./MR2TestMods");

export { description, id, load, name, preload, version };
