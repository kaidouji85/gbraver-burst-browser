// @flow

import * as THREE from 'three';
import type {OverlapTarget} from "../../overlap/target/overlap-target";
import {isMeshOverlap} from "../../overlap/check/raycaster/raycaster-overlap";

/**
 * 当たり判定用のメッシュを生成する
 *
 * @param width 幅
 * @param height 高
 * @return メッシュ
 */
export function createOverlapMesh(width: number, height: number): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('rgb(0, 255, 0)'),
    visible: true
  });
  return new THREE.Mesh(geometry, material);
}

type Param = {
  width: number,
  height: number
};

export class ButtonOverlap implements OverlapTarget {
  _mesh: THREE.Mesh;

  constructor(param: Param) {
    const geometry = new THREE.PlaneGeometry(param.width, param.height, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('rgb(0, 255, 0)'),
      visible: true
    });
    this._mesh = new THREE.Mesh(geometry, material);
  }

  isOverlap(raycaster: THREE.Raycaster): boolean {
    return isMeshOverlap(raycaster, this._mesh);
  }

  getObject3D(): THREE.Object3D {
    return this._mesh;
  }
}