import * as THREE from "three";

import { delay } from "../src/js/animation/delay";
import {
  PredicatedDamage,
  PredicatedDamageConstructParams,
} from "../src/js/game-object/predicated-damage";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "predicated-damage",
};

/** 生成関数のパラメータ */
type CreatorParams = PredicatedDamageConstructParams & {
  /** ダメージ数字 */
  damage: number;
  /** y座標 */
  y?: number;
};

/**
 * ダメージ予想を生成する
 * @param params 生成パラメータ
 * @retyrns 生成結果
 */
const createPredicatedDamage = (params: CreatorParams): THREE.Object3D => {
  const { damage } = params;
  const predicatedDamage = new PredicatedDamage({
    ...params,
  });
  predicatedDamage.getObject3D().position.y = params.y ?? 0;
  predicatedDamage.show(damage).play();
  predicatedDamage.notifyPush().subscribe(() => {
    console.log("push");
    predicatedDamage
      .popBattleSimulatorIcon()
      .chain(predicatedDamage.hidden())
      .chain(delay(1000))
      .chain(predicatedDamage.show(damage))
      .play();
  });
  return predicatedDamage.getObject3D();
};

/** ダメージ予想の４桁単体表示 */
export const fourDigitNumber = hudGameObjectStory((params) => [
  createPredicatedDamage({
    ...params,
    damage: 2000,
    battleSimulatorIconPosition: "right",
  }),
]);

/** ダメージ予想の3桁単体表示 */
export const threeDigitNumber = hudGameObjectStory((params) => [
  createPredicatedDamage({
    ...params,
    damage: 650,
    battleSimulatorIconPosition: "right",
  }),
]);

/** ダメージ予想の2桁単体表示 */
export const twoDigitNumber = hudGameObjectStory((params) => [
  createPredicatedDamage({
    ...params,
    damage: 10,
    battleSimulatorIconPosition: "right",
  }),
]);

/** ダメージ予想の1桁単体表示 */
export const oneDigitNumber = hudGameObjectStory((params) => [
  createPredicatedDamage({
    ...params,
    damage: 1,
    battleSimulatorIconPosition: "right",
  }),
]);

/** ダメージ予想の複数表示 */
export const multi = hudGameObjectStory((params) => [
  createPredicatedDamage({
    ...params,
    damage: 2000,
    y: 0,
    battleSimulatorIconPosition: "right",
  }),
  createPredicatedDamage({
    ...params,
    damage: 200,
    y: 50,
    battleSimulatorIconPosition: "right",
  }),
  createPredicatedDamage({
    ...params,
    damage: 20,
    y: 100,
    battleSimulatorIconPosition: "right",
  }),
  createPredicatedDamage({
    ...params,
    damage: 2,
    y: 150,
    battleSimulatorIconPosition: "right",
  }),
]);

/** ダメージ予想の複数表示(left) */
export const multiLeft = hudGameObjectStory((params) => [
  createPredicatedDamage({
    ...params,
    damage: 2000,
    y: 0,
    battleSimulatorIconPosition: "left",
  }),
  createPredicatedDamage({
    ...params,
    damage: 200,
    y: 50,
    battleSimulatorIconPosition: "left",
  }),
  createPredicatedDamage({
    ...params,
    damage: 20,
    y: 100,
    battleSimulatorIconPosition: "left",
  }),
  createPredicatedDamage({
    ...params,
    damage: 2,
    y: 150,
    battleSimulatorIconPosition: "left",
  }),
]);
