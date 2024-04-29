import * as THREE from "three";

import { delay } from "../src/js/animation/delay";
import {
  PredicatedDamage,
  PredicatedDamageConstructParams,
} from "../src/js/game-object/predicated-damage";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

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
    .chain(delay(2000))
    .chain(predicatedDamage.hidden())
    .chain(delay(2000))
    .loop();
};

/** 生成関数のパラメータ */
type CreatorParams = PredicatedDamageConstructParams & {
  /** ダメージ数字 */
  damage: number;
};

/**
 * ダメージ予想を生成する
 * @param params 生成パラメータ
 * @retyrns 生成結果
 */
const createPredicatedDamage = (params: CreatorParams): THREE.Object3D => {
  const { damage } = params;
  const predicatedDamage = new PredicatedDamage(params);
  flash(predicatedDamage, damage);
  return predicatedDamage.getObject3D();
};

/** ダメージ予想の表示 */
export const predicatedDamage = (): HTMLElement => {
  const stub = new HUDGameObjectStub((params) => [
    createPredicatedDamage({...params, damage: 2000})
  ]);
  stub.start();
  return stub.domElement();
};
