import {PlayerSparkView} from "./player-spark-view";
import type {Resources} from "../../../../resource";
import type {SparkModel} from "../model/spark-model";

export class EnemySparkView extends PlayerSparkView {
  constructor(resources: Resources) {
    super(resources);
  }

  engage(model: SparkModel): void {
    super.engage(model);

    const group = super.getObject3D();
    group.position.x *= -1;
    group.scale.x = -1;
  }
}