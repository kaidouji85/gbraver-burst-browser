// @flow

import type {Battle3DCameraModel} from "./model/model";
import * as THREE from "three";

/**
 * モデルをカメラに反映させる
 * 本関数はcameraを変更する副作用がある
 *
 * @param model モデル
 * @param camera カメラ
 */
export function engage(model: Battle3DCameraModel, camera: typeof THREE.PerspectiveCamera): void {
  camera.position.x = model.position.x;
  camera.position.y = model.position.y;
  camera.position.z = model.position.z;

  camera.lookAt(model.target.x, model.target.y, model.target.z);
}