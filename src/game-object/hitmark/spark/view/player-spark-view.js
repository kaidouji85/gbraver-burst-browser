// @flow
import * as THREE from 'three';
import type {SparkView} from "./spark-view";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {Resources} from "../../../../resource";
import type {SparkModel} from "../model/spark-model";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";

export class PlayerSparkView implements SparkView {
  _animation: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(v => v.id === TEXTURE_IDS.HITMARK_SPARK);
    const texture = textureResource ? textureResource.texture : new THREE.Texture();
    this._animation = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: 16,
      width: 700,
      height: 700,
    });
  }

  engage(model: SparkModel): void {
    this._animation.mesh.position.x = model.position.x;
    this._animation.mesh.position.y = model.position.y;
    this._animation.mesh.position.z = model.position.z;
    this._animation.animate(model.animation.frame);
    this._animation.mesh.material.opacity = model.opacity;
  }

  getObject3D(): THREE.Object3D {
    return this._animation.mesh;
  }
}