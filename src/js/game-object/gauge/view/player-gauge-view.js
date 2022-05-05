// @flow

import * as THREE from 'three';
import type {GaugeView} from "./gauge-view";
import type {GaugeModel} from "../model/gauge-model";
import type {Resources} from "../../../resource";
import type {PreRender} from "../../../game-loop/pre-render";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {PlayerHpBar} from "./player-hp-bar";
import {HpNumber} from "./hp-number";
import {PlayerBatteryGauge} from "./player-battery-gauge";
import {HUDUIScale} from "../../scale";

/** 基本拡大率 */
export const BASE_SCALE = 0.3;

/** 上余白 最小値 */
export const MIN_PADDING_TOP = 50;

/** プレイヤーゲージのビュー */
export class PlayerGaugeView implements GaugeView {
  _group: typeof THREE.Group;
  _base: SimpleImageMesh;
  _hpBar: PlayerHpBar;
  _hpNumber: HpNumber;
  _maxHpNumber: HpNumber;
  _batteryGauge: PlayerBatteryGauge;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._group.scale.set(BASE_SCALE, BASE_SCALE, BASE_SCALE);

    const gaugeBase = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.PLAYER_GAUGE_BASE)?.image ?? new Image();
    this._base = new SimpleImageMesh({canvasSize: 1024, meshSize: 1024, image: gaugeBase, imageWidth: 548});
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

  /**
   * デストラクタ相当の処理
   */
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
   * @param preRender プリレンダーアクション
   */
  engage(model: GaugeModel, preRender: PreRender): void {
    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);

    this._hpBar.setValue(model.hp / model.maxHp);
    this._hpNumber.setValue(model.hp);
    this._maxHpNumber.setValue(model.maxHp);
    this._batteryGauge.engage(model.batteryList);

    this._group.scale.set(
      BASE_SCALE * devicePerScale,
      BASE_SCALE * devicePerScale,
      BASE_SCALE * devicePerScale
    );

    const minY = preRender.rendererDOM.clientHeight / 2
      - MIN_PADDING_TOP * devicePerScale;
    const safeAreaY = preRender.rendererDOM.clientHeight / 2
      - preRender.safeAreaInset.top * devicePerScale;
    this._group.position.x = model.tracking.x;
    this._group.position.y = Math.min(minY, safeAreaY, model.tracking.y);
    this._group.position.z = 0;

    this._group.quaternion.copy(preRender.camera.quaternion);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }
}