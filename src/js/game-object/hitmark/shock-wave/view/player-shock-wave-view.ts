import * as R from "ramda";
import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type {
  ShockWaveLineModel,
  ShockWaveModel,
} from "../model/shock-wave-model";
import { ShockWaveLineView } from "./shock-wave-line-view";
import { ShockWaveRingView } from "./shock-wave-ring-view";
import type { ShockWaveView } from "./shock-wave-view";

/**
 * プレイヤーの衝撃波ビュー
 */
export class PlayerShockWaveView implements ShockWaveView {
  #group: THREE.Group;
  #lines: ShockWaveLineView[];
  #ring: ShockWaveRingView;

  constructor(resources: Resources, initialModel: ShockWaveModel) {
    const maxLines = initialModel.lines.length;
    this.#group = new THREE.Group();
    this.#lines = R.times(() => new ShockWaveLineView(resources), maxLines);
    this.#lines.forEach((v) => {
      this.#group.add(v.getObject3D());
    });
    this.#ring = new ShockWaveRingView(resources);
    this.#group.add(this.#ring.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#lines.forEach((v) => {
      v.destructor();
    });
    this.#ring.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveModel): void {
    this.#group.position.set(
      model.position.x,
      model.position.y,
      model.position.z,
    );
    this.#group.scale.set(1, 1, 1);
    this.#ring.engage(model.ring);

    if (model.lines.length !== this.#lines.length) {
      return;
    }

    model.lines.forEach((lineModel: ShockWaveLineModel, i: number) => {
      const lineView: ShockWaveLineView = this.#lines[i];
      lineView.engage(lineModel);
    });
  }

  /**
   * 指定したカメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
