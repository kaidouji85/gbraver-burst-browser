import { delay } from "../src/js/animation/delay";
import {
  BatteryEnhancementCreatorParams,
  enemyBatteryEnhancement,
  playerBatteryEnhancement,
} from "../src/js/game-object/battery-enhancement";
import { BatteryEnhancement } from "../src/js/game-object/battery-enhancement/battery-enhancement";
import { tdGameObjectStory } from "./stub/td-game-object-stub";

export default {
  title: "battery-enhancement",
};

/**
 * バッテリー増強インジケータのストーリー
 * @param generator バッテリー増強インジケータ生成関数
 * @param fn バッテリー増強インジケータ操作関数
 * @returns story
 */
const batteryEnhancementStory = (
  generator: (params: BatteryEnhancementCreatorParams) => BatteryEnhancement,
  fn: (batteryEnhancement: BatteryEnhancement) => void,
) =>
  tdGameObjectStory((params) => {
    const batteryEnhancement = generator(params);
    fn(batteryEnhancement);
    return {
      objects: [batteryEnhancement.getObject3D()],
    };
  });

/**
 * ポップアップ
 * @param batteryEnhancement バッテリー増強インジケータ
 */
const popUp = (batteryEnhancement: BatteryEnhancement) => {
  delay(1000).chain(batteryEnhancement.popUp()).loop();
};

/** プレイヤー バッテリー増強インジケータ ポップアップ */
export const playerPopUp = batteryEnhancementStory(
  playerBatteryEnhancement,
  popUp,
);

/** 敵 バッテリー増強インジケータ ポップアップ */
export const enemyPopUP = batteryEnhancementStory(
  enemyBatteryEnhancement,
  popUp,
);
