import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { hudUIScale } from "../../scale";
import type { GaugeModel } from "../model/gauge-model";
import { BATTERY_UNIT_GAUGE_PIXEL_WIDTH } from "./battery-gauge-unit";
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
  #group: THREE.Group;
  #hpFrame: HorizontalAnimationMesh;
  #hpBar: EnemyHpBar;
  #hpNumber: HpNumber;
  #maxHpNumber: HpNumber;
  #batteryFrame: HorizontalAnimationMesh;
  #batteryGauge: EnemyBatteryGauge;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#group.scale.set(BASE_SCALE, BASE_SCALE, BASE_SCALE);

    const hpFrameTexture =
      resources.textures.find((v) => v.id === TEXTURE_IDS.ENEMY_HP_GAUGE)
        ?.texture ?? new THREE.Texture();
    this.#hpFrame = new HorizontalAnimationMesh({
      width: 1024,
      height: 1024,
      texture: hpFrameTexture,
      maxAnimation: 1,
    });
    this.#hpFrame.getObject3D().position.set(-110, 37, 0);
    this.#group.add(this.#hpFrame.getObject3D());

    this.#hpBar = new EnemyHpBar(resources);
    this.#hpBar.getObject3D().position.set(213, 30.5, 1);
    this.#group.add(this.#hpBar.getObject3D());

    this.#hpNumber = new HpNumber(resources);
    this.#hpNumber.getObject3D().position.set(-145, 52, 1);
    this.#group.add(this.#hpNumber.getObject3D());

    this.#maxHpNumber = new HpNumber(resources);
    this.#maxHpNumber.getObject3D().position.set(10, 52, 1);
    this.#group.add(this.#maxHpNumber.getObject3D());

    const batteryFrameTexture =
      resources.textures.find((v) => v.id === TEXTURE_IDS.ENEMY_BATTERY_GAUGE)
        ?.texture ?? new THREE.Texture();
    this.#batteryFrame = new HorizontalAnimationMesh({
      width: 1024,
      height: 1024,
      texture: batteryFrameTexture,
      maxAnimation: 1,
    });
    this.#batteryFrame.getObject3D().position.set(-110, -55.5, 0);
    this.#group.add(this.#batteryFrame.getObject3D());

    this.#batteryGauge = new EnemyBatteryGauge(resources);
    this.#batteryGauge
      .getObject3D()
      .position.set(169.5 + BATTERY_UNIT_GAUGE_PIXEL_WIDTH / 2, -55.5, 1);
    this.#group.add(this.#batteryGauge.getObject3D());
  }

  /** @override */
  destructor(): void {
    this.#hpFrame.destructor();
    this.#hpBar.destructor();
    this.#hpNumber.destructor();
    this.#maxHpNumber.destructor();
    this.#batteryFrame.destructor();
    this.#batteryGauge.destructor();
  }

  /** @override */
  engage(model: GaugeModel, preRender: PreRender): void {
    const devicePerScale = hudUIScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    this.#hpBar.setValue(model.hp / model.maxHp);
    this.#hpNumber.setValue(model.hp);
    this.#maxHpNumber.setValue(model.maxHp);
    this.#batteryGauge.engage(model.batteryList);
    this.#batteryGauge.getObject3D().scale.x = -5 / model.maxBattery;
    this.#group.scale.set(
      BASE_SCALE * devicePerScale,
      BASE_SCALE * devicePerScale,
      BASE_SCALE * devicePerScale,
    );
    const minY =
      preRender.rendererDOM.clientHeight / 2 - MIN_PADDING_TOP * devicePerScale;
    const safeAreaY =
      preRender.rendererDOM.clientHeight / 2 -
      preRender.safeAreaInset.top * devicePerScale;
    this.#group.position.x = model.tracking.x;
    this.#group.position.y = Math.min(minY, safeAreaY, model.tracking.y);
    this.#group.position.z = 0;
    this.#group.quaternion.copy(preRender.camera.quaternion);
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /** @override */
  addObject3D(object: THREE.Object3D): void {
    this.#group.add(object);
  }
}
