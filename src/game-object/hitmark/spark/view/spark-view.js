import * as THREE from 'three';
import type {SparkModel} from "../model/spark-model";

export interface SparkView {
  engage(model: SparkModel): void;
  getObject3D(): THREE.Object3D;
}