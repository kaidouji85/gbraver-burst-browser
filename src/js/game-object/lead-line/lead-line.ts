import * as THREE from "three";

/** 座標 */
// type Position = {
//   x: number;
//   y: number;
// };

/** 引き出し線 */
export class Leadline {
  /** 線 */
  #line: THREE.Line;

  /**
   * コンストラクタ
   * @param color 線の色
   */
  constructor(color: THREE.ColorRepresentation = 0x0000ff) {
    const material = new THREE.LineBasicMaterial({
      color,
    });
    const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(100, 0, 0)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.#line = new THREE.Line(geometry, material);
  }

  // set(a: Position, b: Position): void {
  //
  // }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#line;
  }
}
