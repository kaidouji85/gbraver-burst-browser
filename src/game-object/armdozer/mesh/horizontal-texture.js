import type {ArmdozerAnimation} from "./armdozer-animation";
import type {TextureId} from "../../../resource/texture";
import type {Resources} from "../../../resource";
import * as THREE from "three";
import {HorizontalAnimationMesh} from "../../../mesh/animation/horizontal-animation-mesh";

type Param = {
  id: TextureId,
  resources: Resources,
  maxAnimation: number,
  width: number,
  height: number,
};

/** アームドーザアニメーション水平方向テクスチャ版 */
export class HorizontalArmdozerAnimation implements ArmdozerAnimation {
  _animation: HorizontalAnimationMesh;

  constructor(param: Param) {
    this._animation = new HorizontalAnimationMesh(param);
  }

  /** アニメーション進捗を変更する */
  animate(animation: number): void {
    this._animation.animate(animation);
  }

  /** 表示、非表示を設定する */
  visible(isVisible: boolean): void {
    this._animation.mesh.material.opacity = isVisible ? 1 : 0;
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._animation.mesh;
  }
}