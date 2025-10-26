import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { BatterySelectorModel } from "../../model";

/** バッテリーセレクタ数字 */
export class ActiveBatteryNumber {
  /** 数字メッシュ */
  #numberMesh: HorizontalAnimationMesh;
  /** 値 */
  #value: number;

  /**
   * コンストラクタ
   * @param options 生成オプション
   * @param options.value 数字の値
   */
  constructor(options: ResourcesContainer & { value: number }) {
    const { resources, value } = options;
    const maxAnimation = 16;
    const texture = findTextureOrThrow(
      resources,
      TEXTURE_IDS.BATTERY_SELECTOR_NUMBER,
    ).texture;
    this.#numberMesh = new HorizontalAnimationMesh({
      texture,
      maxAnimation,
      width: 64,
      height: 64,
    });
    this.#numberMesh.animate(value / maxAnimation);

    this.#value = value;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#numberMesh.destructor();
  }

  /**
   * モデルにビューを反映させる
   * @param model モデル
   */
  update(model: BatterySelectorModel): void {
    // NOP
  }
}
