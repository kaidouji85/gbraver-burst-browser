// @flow
import {PlayerSparkView} from "./player-spark-view";
import type {Resources} from "../../../../resource";
import type {SparkModel} from "../model/spark-model";

/** 敵火花ヒットマークビュー */
export class EnemySparkView extends PlayerSparkView {
  constructor(resources: Resources) {
    super(resources);
  }

  engage(model: SparkModel): void {
    super.engage(model);
    this._animation.mesh.position.x *= -1;
    this._animation.mesh.scale.x = -1;
  }
}