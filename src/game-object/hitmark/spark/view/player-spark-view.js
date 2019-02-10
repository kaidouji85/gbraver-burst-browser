// @flow
import * as THREE from 'three';
import type {SparkView} from "./spark-view";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {Resources} from "../../../../resource";
import type {SparkModel} from "../model/spark-model";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";

/** プレイヤー火花ヒットマークビュー */
export class PlayerSparkView implements SparkView {
  _animation: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(v => v.id === TEXTURE_IDS.HITMARK_SPARK);
    const texture = textureResource ? textureResource.texture : new THREE.Texture();
    this._animation = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: 16,
      width: 500,
      height: 500,
    });
  }

  /** モデルをビューに反映させる */
  engage(model: SparkModel): void {
    this._animation.mesh.position.x = model.position.x;
    this._animation.mesh.position.y = model.position.y;
    this._animation.mesh.position.z = model.position.z;
    this._animation.mesh.material.opacity = model.opacity;
    this._animation.animate(model.animation.frame);
  }

  /** カメラ方向を向く */
  lookAt(camera: THREE.Camera): void {
    this._animation.mesh.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._animation.mesh;
  }
}