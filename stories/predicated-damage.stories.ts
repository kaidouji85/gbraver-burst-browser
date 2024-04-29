import { StoryFn } from "@storybook/html";
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

/**
 * 点滅
 * @param predicatedDamage ダメージ予想
 * @param damage 表示ダメージ
 */
const flash = (predicatedDamage: PredicatedDamage, damage: number) => {
  predicatedDamage
    .show(damage)
    .chain(delay(6000))
    .chain(predicatedDamage.hidden())
    .chain(delay(1000))
    .loop();
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
  const predicatedDamage = new PredicatedDamage(params);
  predicatedDamage.getObject3D().position.y = params.y ?? 0;
  flash(predicatedDamage, damage);
  return predicatedDamage.getObject3D();
};

/** ダメージ予想の単体表示 */
export const single: StoryFn = hudGameObjectStory((params) => [
  createPredicatedDamage({ ...params, damage: 2000 }),
]);

/** ダメージ予想の複数表示 */
export const multi: StoryFn = hudGameObjectStory((params) => [
  createPredicatedDamage({ ...params, damage: 2000, y: 0 }),
  createPredicatedDamage({ ...params, damage: 200, y: 100 }),
  createPredicatedDamage({ ...params, damage: 20, y: 200 }),
  createPredicatedDamage({ ...params, damage: 20, y: 300 }),
]);
