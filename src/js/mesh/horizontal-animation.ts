import * as THREE from "three";

import { SPRITE_RENDER_ORDER } from "../render/render-order/td-render-order";
import { animatedTexture } from "../texture/animation/texture-animation";
import { normalizeTextureOffset } from "../texture/animation/texture-offset";

type Param = {
  texture: THREE.Texture;
  maxAnimation: number;
  width: number;
  height: number;
};

/**
 * テクスチャアニメーション用メッシュ
 * 本クラスで使用するテクスチャは、横方向にのみアニメーション連結されたものである
 */
export class HorizontalAnimationMesh {
  texture: THREE.Texture;
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  width: number;
  height: number;
  maxAnimation: number;

  constructor(param: Param) {
    this.width = param.width;
    this.height = param.height;
    this.texture = param.texture.clone();
    animatedTexture(this.texture, param.maxAnimation, 1);
    this.texture.needsUpdate = true;
    this.maxAnimation = param.maxAnimation;
    const geometry = new THREE.PlaneGeometry(param.height, param.width, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: this.texture
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.renderOrder = SPRITE_RENDER_ORDER;
    this.mesh.material.depthTest = false;
  }

  /** デストラクタ */
  destructor(): void {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.texture.dispose();
  }

  /**
   * アニメーションを設定する
   *
   * @param frame 0〜1で指定するアニメーション進捗度
   */
  animate(frame: number): void {
    this.texture.offset.x = normalizeTextureOffset(frame, this.maxAnimation);
    this.texture.offset.y = 0;
  }

  /** 透明度を設定する */
  setOpacity(opacity: number): void {
    this.mesh.material.opacity = opacity;
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this.mesh;
  }

}