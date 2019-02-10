import type {SparkView} from "./spark-view";
import type {ArmdozerAnimation} from "../../../armdozer/mesh/armdozer-animation";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {Resources} from "../../../../resource";
import type {SparkModel} from "../model/spark-model";
import {HorizontalArmdozerAnimation} from "../../../armdozer/mesh/horizontal-texture";

export class PlayerSparkView implements SparkView {
  _mesh: ArmdozerAnimation;

  constructor(resources: Resources) {
    this._mesh = new HorizontalArmdozerAnimation({
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