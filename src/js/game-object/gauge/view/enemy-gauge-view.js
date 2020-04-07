// @flow

import * as THREE from 'three';
import type {GaugeView} from "./gauge-view";
import type {GaugeModel} from "../model/gauge-model";
import type {Resources} from "../../../resource";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {EnemyHpBar} from "./enemy-hp-bar";
import {HpNumber} from "./hp-number";
import {EnemyBatteryGauge} from "./enemy-battery-gauge";

/** キャンバスの大きさ */
export const BASE_CANVAS_SIZE = 1024;

/** 基本拡大率 */
export const SCALE = 0.3;

/** 敵のビュー */
export class EnemyGaugeView implements GaugeView {
  _group: THREE.Group;
  _base: SimpleImageMesh;
  _hpBar: EnemyHpBar;
  _hpNumber: HpNumber;
  _maxHpNumber: HpNumber;
  _batteryGauge: EnemyBatteryGauge;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._group.scale.set(SCALE, SCALE, SCALE);

    const gaugeBaseResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ENEMY_GAUGE_BASE);
    const gaugeBase = gaugeBaseResource
      ? gaugeBaseResource.image
      : new Image();
    this._base = new SimpleImageMesh({
      canvasSize: BASE_CANVAS_SIZE,
      meshSize: BASE_CANVAS_SIZE,
      image: gaugeBase
    });
    this._group.add(this._base.getObject3D());

    this._hpBar = new EnemyHpBar(resources);
    this._hpBar.getObject3D().position.set(213 ,30.5, 1);
    this._group.add(this._hpBar.getObject3D());

    this._hpNumber = new HpNumber(resources);
    this._hpNumber.getObject3D().position.set(10, 52, 1);
    this._group.add(this._hpNumber.getObject3D());

    this._maxHpNumber = new HpNumber(resources);
    this._maxHpNumber.getObject3D().position.set(-145, 52, 1);
    this._group.add(this._maxHpNumber.getObject3D());
    
    this._batteryGauge = new EnemyBatteryGauge(resources);
    this._batteryGauge.getObject3D().position.set(169.5, -55.5, 1);
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

  /**
   * モデルをビューに反映させる
   * 
   * @param model モデル
   * @param preRender プリレンダー
   */
  engage(model: GaugeModel, preRender: PreRender): void {
    this._hpBar.setValue(model.hp / model.maxHp);
    this._hpNumber.setValue(model.hp);
    this._maxHpNumber.setValue(model.maxHp);
    this._batteryGauge.engage(model.batteryList);

    this._group.position.x = model.positionX;
    this._group.position.y = 0;
    this._group.position.z = 0;

    this._group.quaternion.copy(preRender.camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}