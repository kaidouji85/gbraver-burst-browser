import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { hudUIScale } from "../../scale";
import { StatusIconModel } from "../model/status-icon-model";

/** テクスチャの大きさ */
const TEXTURE_SIZE = 70;

/** ステータスアイコンのビュー */
export class StatusIconView {
  /** ボタンのテクスチャ */
  #button: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param options コンストラクタのパラメータ
   */
  constructor(options: ResourcesContainer) {
    const { resources } = options;
    const buttonTexture =
      resources.textures.find((v) => v.id === TEXTURE_IDS.STATUS_ICON)
        ?.texture ?? new THREE.Texture();
    this.#button = new HorizontalAnimationMesh({
      texture: buttonTexture,
      maxAnimation: 1,
      width: TEXTURE_SIZE,
      height: TEXTURE_SIZE,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#button.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#button.getObject3D();
  }

  /**
   * モデルをビューに反映する
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: StatusIconModel, preRender: PreRender): void {
    const devicePerScale = hudUIScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    const target = this.#button.getObject3D();
    target.scale.set(devicePerScale, devicePerScale, devicePerScale);
    this.#button.opacity(model.opacity);
  }
}
