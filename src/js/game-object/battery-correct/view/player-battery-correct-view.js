// @flow

import * as THREE from "three";
import type {PreRender} from "../../../game-loop/pre-render";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import {ARMDOZER_EFFECT_STANDARD_Z} from "../../armdozer/position";
import type {BatteryCorrectModel} from "../model/battery-correct-model";
import type {BatteryCorrectView} from "./battery-correct-view";

/** メッシュの大きさ */
const MESH_SIZE = 50;
/** 最大アニメ数 */
const MAX_BATTERY_ANIMATION = 16;
/** 絶対価の最大値 */
const MAX_ABSOLUTE_VALUE = 9;
/** +符号フレーム */
const PLUS_SIGN = 10 / MAX_BATTERY_ANIMATION;
/** -符号フレーム */
const MINUS_SIGN = 11 / MAX_BATTERY_ANIMATION;

/** プレイヤー側 バッテリー補正ビュー */
export class PlayerBatteryCorrectView implements BatteryCorrectView {
  #value: HorizontalAnimationMesh;
  #sign: HorizontalAnimationMesh;
  #group: typeof THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソースか管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();

    const batteryNumber = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_NUMBER)
      ?.texture ?? new THREE.Texture();

    this.#value = new HorizontalAnimationMesh({
      texture: batteryNumber,
      maxAnimation: MAX_BATTERY_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
    this.#value.getObject3D().position.x = 10;
    this.#group.add(this.#value.getObject3D());

    this.#sign = new HorizontalAnimationMesh({
      texture: batteryNumber,
      maxAnimation: MAX_BATTERY_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
    this.#sign.getObject3D().position.x = -20;
    this.#group.add(this.#sign.getObject3D());
  }

  /** @override */
  destructor(): void {
    this.#value.destructor();
    this.#sign.destructor();
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /** @override */
  engage(model: BatteryCorrectModel, preRender: PreRender): void {
    const absoluteValue = Math.min(Math.abs(model.correctValue), MAX_ABSOLUTE_VALUE);
    const value = absoluteValue / MAX_BATTERY_ANIMATION;
    this.#value.animate(value);

    const sign = (0 <= model.correctValue) ? PLUS_SIGN : MINUS_SIGN;
    this.#sign.animate(sign);

    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    // BatteryNumberよりも手前に表示したいので、
    // ARMDOZER_EFFECT_STANDARD_Zに+1している
    this.#group.position.z = ARMDOZER_EFFECT_STANDARD_Z + 1;

    this.#value.setOpacity(model.opacity);
    this.#sign.setOpacity(model.opacity);

    this.#group.scale.x = model.scale;
    this.#group.scale.y = model.scale;

    this.#group.quaternion.copy(preRender.camera.quaternion);
  }
}