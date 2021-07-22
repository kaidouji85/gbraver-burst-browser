// @flow

import * as THREE from "three";
import type {BatteryCorrectView} from "./battery-correct-view";
import type {Resources} from "../../../resource";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";
import type {BatteryCorrectModel} from "../model/battery-correct-model";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";
import type {PreRender} from "../../../game-loop/pre-render";

/** メッシュの大きさ */
const MESH_SIZE = 80;
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
  _value: HorizontalAnimationMesh;
  _sign: HorizontalAnimationMesh;
  _group: typeof THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソースか管理オブジェクト
   */
  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const batteryNumber = resources.textures.find(v => v.id === TEXTURE_IDS.BATTERY_NUMBER)
      ?.texture ?? new THREE.Texture();

    this._value = new HorizontalAnimationMesh({
      texture: batteryNumber,
      maxAnimation: MAX_BATTERY_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
    this._group.add(this._value.getObject3D());

    this._sign = new HorizontalAnimationMesh({
      texture: batteryNumber,
      maxAnimation: MAX_BATTERY_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
    this._sign.getObject3D().position.x = -40;
    this._group.add(this._sign.getObject3D());
  }

  /** @override */
  destructor(): void {
    this._value.destructor();
    this._sign.destructor();
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }

  /** @override */
  engage(model: BatteryCorrectModel, preRender: PreRender): void {
    const absoluteValue = Math.min(Math.abs(model.correctValue), MAX_ABSOLUTE_VALUE);
    const value = absoluteValue / MAX_BATTERY_ANIMATION;
    this._value.animate(value);

    const sign = 0 <= model.correctValue ? PLUS_SIGN : MINUS_SIGN;
    this._sign.animate(sign);

    this._group.position.x = ARMDOZER_EFFECT_STANDARD_X + 100;
    this._group.position.y = ARMDOZER_EFFECT_STANDARD_Y + 100;
    this._group.position.z = ARMDOZER_EFFECT_STANDARD_Z;

    this._value.setOpacity(model.opacity);
    this._sign.setOpacity(model.opacity);

    this._group.scale.x = model.scale;
    this._group.scale.y = model.scale;

    this._group.quaternion.copy(preRender.camera.quaternion);
  }
}