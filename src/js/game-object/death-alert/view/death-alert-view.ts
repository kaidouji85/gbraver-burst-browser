import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { FADE_RENDER_ORDER } from "../../../render/render-order/hud-render-order";
import { ResourcesContainer } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { TextureResource } from "../../../resource/texture/resource";
import { HUD_REARMOST_FADER_Z } from "../../hud-position";
import { hudUIScale } from "../../scale";
import { DeathAlertModel } from "../model/death-alert-model";

/** メッシュの幅 */
export const MESH_WIDTH = 100;

/** メッシュの高さ */
export const MESH_HEIGHT = 100;

/** メッシュのマージン */
export const MARGIN = 100;

/**
 * メッシュを生成する
 * @param texture テクスチャ
 * @returns 生成したメッシュ
 */
const createMesh = (
  texture: TextureResource,
): THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> => {
  const geometry = new THREE.PlaneGeometry(MESH_WIDTH, MESH_HEIGHT);
  const material = new THREE.MeshBasicMaterial({
    color: "rgb(255, 0, 0)",
    transparent: true,
    alphaMap: texture.texture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = HUD_REARMOST_FADER_Z;
  mesh.renderOrder = FADE_RENDER_ORDER;
  return mesh;
};

const leftTop = (rendererDOM: HTMLElement, margin: number) => ({
  x: -rendererDOM.clientWidth / 2 + margin,
  y: rendererDOM.clientHeight / 2 - margin,
});

const leftBottom = (rendererDOM: HTMLElement, margin: number) => ({
  x: -rendererDOM.clientWidth / 2 + margin,
  y: -rendererDOM.clientHeight / 2 + margin,
});

const rightTop = (rendererDOM: HTMLElement, margin: number) => ({
  x: rendererDOM.clientWidth / 2 - margin,
  y: rendererDOM.clientHeight / 2 - margin,
});

const rightBottom = (rendererDOM: HTMLElement, margin: number) => ({
  x: rendererDOM.clientWidth / 2 - margin,
  y: -rendererDOM.clientHeight / 2 + margin,
});

/** デスアラートビュー */
export class DeathAlertView {
  /** メッシュをあつめたもの */
  #meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[];
  /** グループ */
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @param options オプション
   * @param options.resources リソース管理オブジェクト
   */
  constructor(options: ResourcesContainer) {
    const { resources } = options;
    const texture = findTextureOrThrow(
      resources,
      TEXTURE_IDS.DEATH_ALERT_VIGNETTE,
    );
    this.#group = new THREE.Group();
    this.#meshes = [
      createMesh(texture),
      createMesh(texture),
      createMesh(texture),
      createMesh(texture),
    ];
    this.#meshes.forEach((mesh) => {
      this.#group.add(mesh);
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
  }

  /**
   * シーンに追加するための THREE.Object3D を取得する
   * @returns シーンに追加するための THREE.Object3D
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * モデルをビューに反映する
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: DeathAlertModel, preRender: PreRender): void {
    this.#meshes.forEach((mesh, i) => {
      mesh.material.opacity = model.opacity;
      const devicePerScale = hudUIScale(
        preRender.rendererDOM,
        preRender.safeAreaInset,
      );
      mesh.scale.x = devicePerScale;
      mesh.scale.y = devicePerScale;
      mesh.material.color.setRGB(model.color.r, model.color.g, model.color.b);
      const position = (() => {
        switch (i) {
          case 0:
            return leftTop(preRender.rendererDOM, MARGIN);
          case 1:
            return leftBottom(preRender.rendererDOM, MARGIN);
          case 2:
            return rightTop(preRender.rendererDOM, MARGIN);
          case 3:
          default:
            return rightBottom(preRender.rendererDOM, MARGIN);
        }
      })();
      mesh.position.x = position.x;
      mesh.position.y = position.y;
    });
  }
}
