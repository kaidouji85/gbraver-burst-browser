import { PlayerSelect } from "../src/js/dom-scenes/player-select";
import { PlayableArmdozers } from "../src/js/game/playable-amdozers";
import { PlayablePilots } from "../src/js/game/playable-pilots";
import { domStub } from "./stub/dom-stub";

export default {
  title: "player-select",
};

/** シーン表示 */
export const scene = domStub((params) => {
  const scene = new PlayerSelect({
    ...params,
    armdozerIds: PlayableArmdozers,
    pilotIds: PlayablePilots,
  });
  return scene.getRootHTMLElement();
});

/** 戦闘モード表示 */
export const hasBattleMode = domStub((params) => {
  const scene = new PlayerSelect({
    ...params,
    armdozerIds: PlayableArmdozers,
    pilotIds: PlayablePilots,
    battleMode: "🔑あいことばを作る",
  });
  return scene.getRootHTMLElement();
});
