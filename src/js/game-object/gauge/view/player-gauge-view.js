// @flow

import * as THREE from 'three';
import type {PreRender} from "../../../game-loop/pre-render";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {HUDUIScale} from "../../scale";
import type {GaugeModel} from "../model/gauge-model";
import type {GaugeView} from "./gauge-view";
import {HpNumber} from "./hp-number";
import {PlayerBatteryGauge} from "./player-battery-gauge";
import {PlayerHpBar} from "./player-hp-bar";

/** 基本拡大率 */
export const BASE_SCALE = 0.3;

/** 上余白 最小値 */
export const MIN_PADDING_TOP = 50;

/** プレイヤーゲージのビュー */
export class PlayerGaugeView implements GaugeView {
  #group: typeof THREE.Group;
  #base: SimpleImageMesh;
  #hpBar: PlayerHpBar;
  #hpNumber: HpNumber;
  #maxHpNumber: HpNumber;
  #batteryGauge: PlayerBatteryGauge;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#group.scale.set(BASE_SCALE, BASE_SCALE, BASE_SCALE);

    const gaugeBase = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.PLAYER_GAUGE_BASE)?.image ?? new Image();
    this.#base = new SimpleImageMesh({canvasSize: 1024, meshSize: 1024, image: gaugeBase, imageWidth: 548});
    this.#group.add(this.#base.getObject3D());

    this.#hpBar = new PlayerHpBar(resources);
    this.#hpBar.getObject3D().position.set(-212 ,31.5, 1);
    this.#group.add(this.#hpBar.getObject3D());

    this.#hpNumber = new HpNumber(resources);
    this.#hpNumber.getObject3D().position.set(80, 52, 1);
    this.#group.add(this.#hpNumber.getObject3D());

    this.#maxHpNumber = new HpNumber(resources);
    this.#maxHpNumber.getObject3D().position.set(240, 52, 1);
    this.#group.add(this.#maxHpNumber.getObject3D());

    this.#batteryGauge = new PlayerBatteryGauge(resources);
    this.#batteryGauge.getObject3D().position.set(-169.5, -55.5, 1);
    this.#group.add(this.#batteryGauge.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#base.destructor();
    this.#hpBar.destructor();
    this.#hpNumber.destructor();
    this.#maxHpNumber.destructor();
    this.#batteryGauge.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダーアクション
   */
  engage(model: GaugeModel, preRender: PreRender): void {
    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);

    this.#hpBar.setValue(model.hp / model.maxHp);
    this.#hpNumber.setValue(model.hp);
    this.#maxHpNumber.setValue(model.maxHp);
    this.#batteryGauge.engage(model.batteryList);

    this.#group.scale.set(
      BASE_SCALE * devicePerScale,
      BASE_SCALE * devicePerScale,
      BASE_SCALE * devicePerScale
    );

    const minY = preRender.rendererDOM.clientHeight / 2
      - MIN_PADDING_TOP * devicePerScale;
    const safeAreaY = preRender.rendererDOM.clientHeight / 2
      - preRender.safeAreaInset.top * devicePerScale;
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = Math.min(minY, safeAreaY, model.tracking.y);
    this.#group.position.z = 0;

    this.#group.quaternion.copy(preRender.camera.quaternion);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }
}