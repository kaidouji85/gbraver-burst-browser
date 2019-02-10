// @flow
import * as THREE from "three";
import {SPRITE_RENDER_ORDER} from "./render-order";
import {normalizeTextureOffset} from "../texture/animation/texture-offset";
import {animatedTexture} from "../texture/animation/texture-animation";

type Param = {
  texture: THREE.Texture,
  maxAnimation: number,
  width: number,
  height: number,
};

/**
 * テクスチャアニメーション用メッシュ
 * 本クラスで使用するテクスチャは、横方向にのみアニメーション連結されたものである
 */
export class HorizontalAnimationMesh {
  texture: THREE.Texture;
  mesh: THREE.Mesh;
  width: number;
  height: number;
  maxAnimation: number;

  constructor(param: Param) {
    this.texture = param.texture;
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
  }

  /** アニメーションを設定する */
  animate(frame: number): void {
    this.texture.offset.x = normalizeTextureOffset(frame, this.maxAnimation);
    this.texture.offset.y = 0;
  }
}