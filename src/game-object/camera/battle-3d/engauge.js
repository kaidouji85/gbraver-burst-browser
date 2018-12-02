// @flow

import type {Battle3DCameraModel} from "./model/model";
import * as THREE from "three";

export function engage(model: Battle3DCameraModel, camera: THREE.PerspectiveCamera): void {
  camera.position.x = model.position.x;
  camera.position.y = model.position.y;
  camera.position.z = model.position.z;

  camera.rotation.x = model.rotation.x;
  camera.rotation.y = model.rotation.y;
  camera.rotation.z = model.rotation.z;
  //camera.lookAt(0, 0, 0);
}