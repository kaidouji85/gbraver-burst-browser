import * as THREE from "three";
import type { PreRender } from "../../../game-loop/pre-render";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import type { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import { HUDUIScale } from "../../scale";
import type { GaugeModel } from "../model/gauge-model";
import { EnemyBatteryGauge } from "./enemy-battery-gauge";
import { EnemyHpBar } from "./enemy-hp-bar";
import type { GaugeView } from "./gauge-view";
import { HpNumber } from "./hp-number";

/** 基本拡大率 */
export const BASE_SCALE = 0.3;

/** 上余白 最小値 */
export const MIN_PADDING_TOP = 50;

/** 敵のビュー */
export class EnemyGaugeView implements GaugeView {
  #group: typeof THREE.Group;
  #base: SimpleImageMesh;
  #hpBar: EnemyHpBar;
  #hpNumber: HpNumber;
  #maxHpNumber: HpNumber;
  #batteryGauge: EnemyBatteryGauge;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#group.scale.set(BASE_SCALE, BASE_SCALE, BASE_SCALE);
    const gaugeBase = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ENEMY_GAUGE_BASE)?.image ?? new Image();
    this.#base = new SimpleImageMesh({
      canvasSize: 1024,
      meshSize: 1024,
      image: gaugeBase,
      imageWidth: 549
    });
    this.#group.add(this.#base.getObject3D());
    this.#hpBar = new EnemyHpBar(resources);
    this.#hpBar.getObject3D().position.set(213, 30.5, 1);
    this.#group.add(this.#hpBar.getObject3D());
    this.#hpNumber = new HpNumber(resources);
    this.#hpNumber.getObject3D().position.set(-145, 52, 1);
    this.#group.add(this.#hpNumber.getObject3D());
    this.#maxHpNumber = new HpNumber(resources);
    this.#maxHpNumber.getObject3D().position.set(10, 52, 1);
    this.#group.add(this.#maxHpNumber.getObject3D());
    this.#batteryGauge = new EnemyBatteryGauge(resources);
    this.#batteryGauge.getObject3D().position.set(169.5, -55.5, 1);
    this.#group.add(this.#batteryGauge.getObject3D());
  }

  /** デストラクタ */
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
   * @param preRender プリレンダー
   */
  engage(model: GaugeModel, preRender: PreRender): void {
    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);
    this.#hpBar.setValue(model.hp / model.maxHp);
    this.#hpNumber.setValue(model.hp);
    this.#maxHpNumber.setValue(model.maxHp);
    this.#batteryGauge.engage(model.batteryList);
    this.#group.scale.set(BASE_SCALE * devicePerScale, BASE_SCALE * devicePerScale, BASE_SCALE * devicePerScale);
    const minY = preRender.rendererDOM.clientHeight / 2 - MIN_PADDING_TOP * devicePerScale;
    const safeAreaY = preRender.rendererDOM.clientHeight / 2 - preRender.safeAreaInset.top * devicePerScale;
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = Math.min(minY, safeAreaY, model.tracking.y);
    this.#group.position.z = 0;
    this.#group.quaternion.copy(preRender.camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

}