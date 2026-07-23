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

/** 最大不透明度 */
const MAX_OPACITY = 0.6;

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

/** メッシュ変換情報の生成オプション */
type MeshTransformOptions = {
  /** デバイスごとのスケール */
  devicePerScale: number;
  /** レンダラーのDOM要素 */
  rendererDOM: HTMLElement;
};

/** メッシュ変換情報 */
type MeshTransform = {
  /** X座標 */
  x: number;
  /** Y座標 */
  y: number;
  /** 回転角度 */
  rotation: number;
};

/**
 * メッシュ変換情報の生成関数
 * @param options 設定オプション
 * @returns 設定
 */
type MeshTransformCreator = (options: MeshTransformOptions) => MeshTransform;

/**
 * 上のメッシュ変換情報
 * @param options 設定オプション
 * @returns 設定
 */
const top: MeshTransformCreator = (options) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x: 0,
    y: rendererDOM.clientHeight / 2 - (MESH_HEIGHT / 2) * devicePerScale,
    rotation: Math.PI,
  };
};

/**
 * 下のメッシュ変換情報
 * @param options 設定オプション
 * @returns 設定
 */
const bottom: MeshTransformCreator = (options) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x: 0,
    y: -rendererDOM.clientHeight / 2 + (MESH_HEIGHT / 2) * devicePerScale,
    rotation: 0,
  };
};

/**
 * 右のメッシュ変換情報
 * @param options 設定オプション
 * @returns 設定
 */
const right: MeshTransformCreator = (options) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x: +rendererDOM.clientWidth / 2 - (MESH_HEIGHT / 2) * devicePerScale,
    y: 0,
    rotation: Math.PI / 2,
  };
};

/**
 * 左のメッシュ変換情報
 * @param options 設定オプション
 * @returns 設定
 */
const left: MeshTransformCreator = (options) => {
  const { rendererDOM, devicePerScale } = options;
  return {
    x: -rendererDOM.clientWidth / 2 + (MESH_HEIGHT / 2) * devicePerScale,
    y: 0,
    rotation: -Math.PI / 2,
  };
};

/** デスアラートビュー */
export class DeathAlertView {
  /** メッシュをあつめたもの */
  #meshes: {
    /** メッシュ */
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    /** メッシュ変換情報の生成関数 */
    transformCreator: MeshTransformCreator;
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
      { mesh: createMesh(texture), transformCreator: top },
      { mesh: createMesh(texture), transformCreator: bottom },
      { mesh: createMesh(texture), transformCreator: right },
      { mesh: createMesh(texture), transformCreator: left },
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
    const devicePerScale = hudUIScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    this.#meshes.forEach(({ mesh, transformCreator }) => {
      mesh.scale.x = devicePerScale;
      mesh.scale.y = devicePerScale;
      mesh.material.opacity = model.opacity * MAX_OPACITY;
      mesh.material.color.setRGB(model.color.r, model.color.g, model.color.b);

      const transform = transformCreator({
        rendererDOM: preRender.rendererDOM,
        devicePerScale,
      });
      mesh.position.x = transform.x;
      mesh.position.y = transform.y;
      mesh.rotation.z = transform.rotation;
    });
  }
}
