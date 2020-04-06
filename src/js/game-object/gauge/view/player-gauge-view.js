// @flow

import * as THREE from 'three';
import type {GaugeView} from "./gauge-view";
import type {GaugeModel} from "../model/gauge-model";
import type {Resources} from "../../../resource";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {PlayerHpBar} from "./player-hp-bar";
import {HpNumber} from "./hp-number";
import {PlayerBatteryGauge} from "./player-battery-gauge";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";

export const BASE_CANVAS_SIZE = 1024;
export const SCALE = 0.3;

/** プレイヤーゲージのビュー */
export class PlayerGaugeView implements GaugeView {
  _group: THREE.Group;
  _base: SimpleImageMesh;
  _hpBar: PlayerHpBar;
  _hpNumber: HpNumber;
  _maxHpNumber: HpNumber;
  _batteryGauge: PlayerBatteryGauge;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._group.scale.set(SCALE, SCALE, SCALE);

    const gaugeBaseResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.PLAYER_GAUGE_BASE);
    const gaugeBase = gaugeBaseResource
      ? gaugeBaseResource.image
      : new Image();
    this._base = new SimpleImageMesh({
      canvasSize: BASE_CANVAS_SIZE,
      meshSize: BASE_CANVAS_SIZE,
      image: gaugeBase
    });
    this._group.add(this._base.getObject3D());

    this._hpBar = new PlayerHpBar(resources);
    this._hpBar.getObject3D().position.set(-212 ,31.5, 1);
    this._group.add(this._hpBar.getObject3D());

    this._hpNumber = new HpNumber(resources);
    this._hpNumber.getObject3D().position.set(80, 52, 1);
    this._group.add(this._hpNumber.getObject3D());

    this._maxHpNumber = new HpNumber(resources);
    this._maxHpNumber.getObject3D().position.set(240, 52, 1);
    this._group.add(this._maxHpNumber.getObject3D());

    this._batteryGauge = new PlayerBatteryGauge(resources);
    this._batteryGauge.getObject3D().position.set(-169.5, -55.5, 1);
    this._group.add(this._batteryGauge.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this._base.destructor();
    this._hpBar.destructor();
    this._hpNumber.destructor();
    this._maxHpNumber.destructor();
    this._batteryGauge.destructor();
  }

  /** モデルをビューに反映させる */
  engage(model: GaugeModel): void {
    this._hpBar.setValue(model.hp / model.maxHp);
    this._hpNumber.setValue(model.hp);
    this._maxHpNumber.setValue(model.maxHp);
    this._batteryGauge.engage(model.batteryList);
  }

  /** プリレンダー */
  preRender(action: PreRender): void {
    this._setPos();
    this._lookAt(action.camera);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** 座標をセットする */
  _setPos(): void {
    this._group.position.x = 100;
    this._group.position.y = 0;
    this._group.position.z = 0;
  }

  /** カメラの真正面を向く */
  _lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }
}