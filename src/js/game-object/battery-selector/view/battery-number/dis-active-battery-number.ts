import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { BatterySelectorModel } from "../../model";
import { createBatteryNumberMesh } from "./create-battery-number-mesh";
import { getBatteryNumberPosition } from "./get-battery-number-position";
import { getBatteryNumberScale } from "./get-battery-number-scale";

/** ディスアクティブバッテリーセレクタ数字 */
export class DisActiveBatteryNumber {
  /** 値 */
  readonly value: number;

  /** 数字メッシュ */
  readonly #numberMesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param options 生成オプション
   * @param options.value 数字の値
   */
  constructor(options: ResourcesContainer & { value: number }) {
    const { resources, value } = options;

    this.value = value;

    const { texture } = findTextureOrThrow(
      resources,
      TEXTURE_IDS.DIS_ACTIVE_BATTERY_SELECTOR_NUMBER,
    );
    this.#numberMesh = createBatteryNumberMesh(value, texture);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#numberMesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#numberMesh.getObject3D();
  }

  /**
   * モデルにビューを反映させる
   * @param model モデル
   */
  update(model: BatterySelectorModel): void {
    const { x, y } = getBatteryNumberPosition(this.value, model.maxBattery);
    this.#numberMesh.getObject3D().position.x = x;
    this.#numberMesh.getObject3D().position.y = y;
    const scale = getBatteryNumberScale(model.maxBattery);
    this.#numberMesh.getObject3D().scale.set(scale, scale, 1);
    const opacity =
      model.enableMaxBattery < this.value && this.value <= model.maxBattery
        ? model.opacity
        : 0;
    this.#numberMesh.opacity(opacity);
  }
}
