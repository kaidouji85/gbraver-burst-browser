// @flow

import type {Battle3DCameraModel} from "./model/model";
import * as THREE from "three";

/** モデルをカメラに反映させる */
export function engage(model: Battle3DCameraModel, camera: THREE.PerspectiveCamera): void {
  camera.position.x = model.position.x;
  camera.position.y = model.position.y;
  camera.position.z = model.position.z;

  camera.lookAt(model.target.x, model.target.y, model.target.z);
}