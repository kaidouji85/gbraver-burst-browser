import { delay } from "../src/js/animation/delay";
import {
  enemyGenesisBraverCutIn,
  playerGenesisBraverCutIn,
} from "../src/js/game-object/cut-in/genesis-braver";
import { GenesisBraverCutIn } from "../src/js/game-object/cut-in/genesis-braver/genesis-braver-cutin";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "genesis-braver-cut-in",
};

/**
 * カットインのストーリー
 * @param cutIn カットイン
 */
const story = (cutIn: GenesisBraverCutIn) => {
  delay(1000)
    .chain(cutIn.show())
    .chain(delay(1000))
    .chain(cutIn.hidden())
    .loop();
};

/** プレイヤーカットイン */
export const playerCutIn = hudGameObjectStory((params) => {
  const cutIn = playerGenesisBraverCutIn(params);
  story(cutIn);
  return [cutIn.getObject3D()];
});

/** 敵カットイン */
export const enemyCutIn = hudGameObjectStory((params) => {
  const cutIn = enemyGenesisBraverCutIn(params);
  story(cutIn);
  return [cutIn.getObject3D()];
});
