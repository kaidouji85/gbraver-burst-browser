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

/** サイズ調整用のスケール */
const ADJUST_SCALE = 1.5;

/** メッシュの幅 */
const MESH_WIDTH = 200 * ADJUST_SCALE;

/** メッシュの高さ */
const MESH_HEIGHT = 50 * ADJUST_SCALE;

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
type MeshConfigOptions = {
  /** デバイスごとのスケール */
  devicePerScale: number;
  /** レンダラーのDOM要素 */
  rendererDOM: HTMLElement;
};

/** メッシュ設定 */
type MeshConfig = {
  /** X座標 */
  x: number;
  /** Y座標 */
  y: number;
  /** 回転角度 */
  rotation: number;
  /** X方向のスケール */
  scaleX: number;
  /** Y方向のスケール */
  scaleY: number;
};

/**
 * メッシュ設定の生成関数
 * @param options 設定オプション
 * @returns 設定
 */
type MeshConfigCreator = (options: MeshConfigOptions) => MeshConfig;

/**
 * 上のメッシュ設定
 * @param options 設定オプション
 * @returns 設定
 */
const top: MeshConfigCreator = (options) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x: 0,
    y:
      rendererDOM.clientHeight / 2 -
      (MESH_HEIGHT / 2) * devicePerScale -
      MARGIN,
    rotation: Math.PI,
    scaleX: devicePerScale,
    scaleY: devicePerScale,
  };
};

/**
 * 下のメッシュ設定
 * @param options 設定オプション
 * @returns 設定
 */
const bottom: MeshConfigCreator = (options) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x: 0,
    y:
      -rendererDOM.clientHeight / 2 +
      (MESH_HEIGHT / 2) * devicePerScale +
      MARGIN,
    rotation: 0,
    scaleX: devicePerScale,
    scaleY: devicePerScale,
  };
};

/**
 * 右のメッシュ設定
 * @param options 設定オプション
 * @returns 設定
 */
const right: MeshConfigCreator = (options) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x:
      +rendererDOM.clientWidth / 2 -
      (MESH_HEIGHT / 2) * devicePerScale -
      MARGIN,
    y: 0,
    rotation: Math.PI / 2,
    scaleX: devicePerScale,
    scaleY: devicePerScale,
  };
};

/**
 * 左のメッシュ設定
 * @param options 設定オプション
 * @returns 設定
 */
const left: MeshConfigCreator = (options) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x:
      -rendererDOM.clientWidth / 2 +
      (MESH_HEIGHT / 2) * devicePerScale +
      MARGIN,
    y: 0,
    rotation: -Math.PI / 2,
    scaleX: devicePerScale,
    scaleY: devicePerScale,
  };
};

/** デスアラートビュー */
export class DeathAlertView {
  /** メッシュをあつめたもの */
  #meshes: {
    /** メッシュ */
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    /** メッシュ設定の生成関数 */
    configCreator: MeshConfigCreator;
  }[];
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
      { mesh: createMesh(texture), configCreator: top },
      { mesh: createMesh(texture), configCreator: bottom },
      { mesh: createMesh(texture), configCreator: right },
      { mesh: createMesh(texture), configCreator: left },
    ];
    this.#meshes.forEach(({ mesh }) => {
      this.#group.add(mesh);
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#meshes.forEach(({ mesh }) => {
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
    this.#meshes.forEach(({ mesh, configCreator }, i) => {
      mesh.material.opacity = model.opacity * 0.6;
      const devicePerScale = hudUIScale(
        preRender.rendererDOM,
        preRender.safeAreaInset,
      );
      mesh.material.color.setRGB(model.color.r, model.color.g, model.color.b);
      const config = configCreator({
        rendererDOM: preRender.rendererDOM,
        devicePerScale,
      });
      mesh.position.x = config.x;
      mesh.position.y = config.y;
      mesh.rotation.z = config.rotation;
      mesh.scale.x = config.scaleX;
      mesh.scale.y = config.scaleY;
    });
  }
}
