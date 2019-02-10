// @flow

import type {ArmdozerAnimation} from "../../game-object/armdozer/mesh/armdozer-animation";
import * as THREE from "three";
import {SPRITE_RENDER_ORDER} from "../render-order";
import type {Resources} from "../../resource";
import {normalizeTextureOffset} from "../../texture/animation/texture-offset";
import type {TextureId} from "../../resource/texture";
import {animatedTexture} from "../../texture/animation/texture-animation";

type Param = {
  id: TextureId,
  resources: Resources,
  maxAnimation: number,
  width: number,
  height: number,
};

/** アニメーションメッシュ */
export class HorizontalAnimationMesh implements ArmdozerAnimation {
  texture: THREE.Texture;
  mesh: THREE.Mesh;
  width: number;
  height: number;
  maxAnimation: number;

  constructor(param: Param) {
    const textureResource = param.resources.textures.find(v => v.id === param.id);
    this.texture = textureResource ? textureResource.texture.clone() : new THREE.Texture();
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

  /** 表示、非表示を設定する */
  visible(isVisible: boolean): void {
    this.mesh.material.opacity = isVisible ? 1 : 0;
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this.mesh;
  }
}