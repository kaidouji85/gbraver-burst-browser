// @flow
import * as THREE from "three";

const MESH_WIDTH = 100;
const MESH_HEIGHT = 100;

/**
 * メータの当たり判定
 * 本クラスは当たり判定用なので、画面上に表示されることはない
 */
export type Meter = {
  /** 当たり判定用のメッシュ */
  mesh: THREE.Mesh,
  /** 当たり判定オブジェクトにタッチした際のスライダー値 */
  value: number
};

/**
 * バッテリースライダーの当たり判定用オブジェクト
 * 本クラスは当たり判定用なので、画面上に表示されることはない
 */
export class TouchLocation {
  /** 当たり判定オブジェクトを集めたもの */
  _meterGroup: THREE.Group;

  constructor() {
    this._meterGroup = new THREE.Group();
    this._meterGroup.add(createMeterMesh());
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    console.log('test');
    return [this._meterGroup];
  }
}

/** メータ当たり判定用のメッシュを生成する */
function createMeterMesh(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(MESH_WIDTH, MESH_HEIGHT, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
  });
  return new THREE.Mesh(geometry, material);
}