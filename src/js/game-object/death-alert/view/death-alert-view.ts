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
const MESH_WIDTH = 100;

/** メッシュの高さ */
const MESH_HEIGHT = 100;

/** メッシュのマージン */
const MARGIN = 0;

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

/** メッシュ設定の生成オプション */
type ConfigOptions = {
  /** デバイスごとのスケール */
  devicePerScale: number;
  /** レンダラーのDOM要素 */
  rendererDOM: HTMLElement;
};

/**
 * 左上のメッシュ設定
 * @param options 設定オプション
 * @returns 設定
 */
const leftTop = (options: ConfigOptions) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x:
      -rendererDOM.clientWidth / 2 +
      MARGIN * devicePerScale +
      (MESH_WIDTH / 2) * devicePerScale,
    y:
      rendererDOM.clientHeight / 2 -
      MARGIN * devicePerScale -
      (MESH_HEIGHT / 2) * devicePerScale,
    rotation: -Math.PI / 2,
  };
};

/**
 * 左下のメッシュ設定
 * @param options 設定オプション
 * @returns 設定
 */
const leftBottom = (options: ConfigOptions) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x:
      -rendererDOM.clientWidth / 2 +
      +(MESH_WIDTH / 2) * devicePerScale +
      MARGIN * devicePerScale,
    y:
      -rendererDOM.clientHeight / 2 +
      (MESH_HEIGHT / 2) * devicePerScale +
      MARGIN * devicePerScale,
    rotation: 0,
  };
};

/**
 * 右上のメッシュ設定
 * @param options 設定オプション
 * @returns 設定
 */
const rightTop = (options: ConfigOptions) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x:
      +rendererDOM.clientWidth / 2 -
      (MESH_WIDTH / 2) * devicePerScale -
      MARGIN * devicePerScale,
    y:
      +rendererDOM.clientHeight / 2 -
      (MESH_HEIGHT / 2) * devicePerScale -
      MARGIN * devicePerScale,
    rotation: Math.PI,
  };
};

/**
 * 右下のメッシュ設定
 * @param options 設定オプション
 * @returns 設定
 */
const rightBottom = (options: ConfigOptions) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x:
      +rendererDOM.clientWidth / 2 -
      (MESH_WIDTH / 2) * devicePerScale -
      MARGIN * devicePerScale,
    y:
      -rendererDOM.clientHeight / 2 +
      (MESH_HEIGHT / 2) * devicePerScale +
      MARGIN * devicePerScale,
    rotation: Math.PI / 2,
  };
};

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
    this.#meshes = [...Array(4)].map(() => createMesh(texture));
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

      const config = (() => {
        const options = { rendererDOM: preRender.rendererDOM, devicePerScale };
        switch (i) {
          case 0:
            return leftTop(options);
          case 1:
            return leftBottom(options);
          case 2:
            return rightTop(options);
          case 3:
            return rightBottom(options);
          default:
            return rightBottom(options);
        }
      })();
      mesh.position.x = config.x;
      mesh.position.y = config.y;
      mesh.rotation.z = config.rotation;
    });
  }
}
