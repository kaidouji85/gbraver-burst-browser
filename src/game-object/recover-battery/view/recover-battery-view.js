// @flow

import * as THREE from 'three';
import type {RecoverBatteryModel} from "../model/recover-battery-model";

export interface RecoverBatteryView {
  engage(model: RecoverBatteryModel): void;
  lookAt(camera: THREE.Camera): void;
  getObject3D(): THREE.Object3D;
}