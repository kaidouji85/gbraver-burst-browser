// @flow

import * as THREE from 'three';
import {createOverlapMesh} from "./overlap-mesh";

type Param = {
  width: number,
  height: number,
};

export class ButtonOperation {
  _overlapMesh: THREE.Mesh;

  constructor(param: Param) {
    this._overlapMesh = createOverlapMesh(param.width, param.height);
  }

  getObject3D(): THREE.Object3D {
    return this._overlapMesh;
  }
}