// @flow

import * as THREE from 'three';

export interface Pilot {
  destructor(): void;
  getObject3D(): THREE.Object3D;
}