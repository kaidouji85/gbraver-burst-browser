import { delay } from "../src/js/animation/delay";
import {
  BatteryNumberCreatorParams,
  enemyBatteryNumber,
  playerBatteryNumber,
} from "../src/js/game-object/battery-number";
import { BatteryNumber } from "../src/js/game-object/battery-number/battery-number";
import { TDGameObjectStub } from "./stub/td-game-object-stub";

export default {
  title: "battery-number",
};

/**
 * バッテリーナンバーのストーリー
 * @param generator バッテリーナンバー生成関数
 * @param fn バッテリーナンバー操作関数
 * @returns story
 */
const batteryNumberStory =
  (
    generator: (params: BatteryNumberCreatorParams) => BatteryNumber,
    fn: (batteryNumber: BatteryNumber) => void,
  ) =>
  () => {
    const stub = new TDGameObjectStub((params) => {
      const sprite = generator(params);
      fn(sprite);
      return {
        objects: [sprite.getObject3D()],
      };
    });
    stub.start();
    return stub.domElement();
  };

/**
 * バッテリーナンバー表示
 * @param value バッテリー値
 * @returns バッテリーナンバー操作関数
 */
const popUp = (value: number) => (batteryNumber: BatteryNumber) => {
  delay(1000)
    .chain(batteryNumber.show(value))
    .chain(delay(2000))
    .chain(batteryNumber.hidden())
    .loop();
};

/** プレイヤー バッテリー 0 */
export const playerBattery0 = batteryNumberStory(playerBatteryNumber, popUp(0));

/** プレイヤー バッテリー 1 */
export const playerBattery1 = batteryNumberStory(playerBatteryNumber, popUp(1));

/** プレイヤー バッテリー 2 */
export const playerBattery2 = batteryNumberStory(playerBatteryNumber, popUp(2));

/** プレイヤー バッテリー 3 */
export const playerBattery3 = batteryNumberStory(playerBatteryNumber, popUp(3));

/** プレイヤー バッテリー 4 */
export const playerBattery4 = batteryNumberStory(playerBatteryNumber, popUp(4));

/** プレイヤー バッテリー 5 */
export const playerBattery5 = batteryNumberStory(playerBatteryNumber, popUp(5));

/** プレイヤー バッテリー 6 */
export const playerBattery6 = batteryNumberStory(playerBatteryNumber, popUp(6));

/** プレイヤー バッテリー 7 */
export const playerBattery7 = batteryNumberStory(playerBatteryNumber, popUp(7));

/** プレイヤー バッテリー 8 */
export const playerBattery8 = batteryNumberStory(playerBatteryNumber, popUp(8));

/** 敵 バッテリー 0 */
export const enemyBattery0 = batteryNumberStory(enemyBatteryNumber, popUp(0));

/** 敵 バッテリー 1 */
export const enemyBattery1 = batteryNumberStory(enemyBatteryNumber, popUp(1));

/** 敵 バッテリー 2 */
export const enemyBattery2 = batteryNumberStory(enemyBatteryNumber, popUp(2));

/** 敵 バッテリー 3 */
export const enemyBattery3 = batteryNumberStory(enemyBatteryNumber, popUp(3));

/** 敵 バッテリー 4 */
export const enemyBattery4 = batteryNumberStory(enemyBatteryNumber, popUp(4));

/** 敵 バッテリー 5 */
export const enemyBattery5 = batteryNumberStory(enemyBatteryNumber, popUp(5));

/** 敵 バッテリー 6 */
export const enemyBattery6 = batteryNumberStory(enemyBatteryNumber, popUp(6));

/** 敵 バッテリー 7 */
export const enemyBattery7 = batteryNumberStory(enemyBatteryNumber, popUp(7));

/** 敵 バッテリー 8 */
export const enemyBattery8 = batteryNumberStory(enemyBatteryNumber, popUp(8));
