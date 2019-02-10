import type {SparkView} from "./spark-view";
import type {SpriteAnimation} from "../../../../mesh/animation/sprite-animation";
import {HorizontalAnimationMesh} from "../../../../mesh/animation/horizontal-animation";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {Resources} from "../../../../resource";
import type {SparkModel} from "../model/spark-model";

export class PlayerSparkView implements SparkView {
  _mesh: SpriteAnimation;

  constructor(resources: Resources) {
    this._mesh = HorizontalAnimationMesh({
      id: TEXTURE_IDS.HITMARK_SPARK,
      resources: resources,
      maxAnimation: 16,
      width: 700,
      height: 700,
    });
  }

  engage(model: SparkModel): void {
    this._mesh.visible(true);
  }

  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }
}