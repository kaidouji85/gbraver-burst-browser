import * as THREE from "three";

/** 座標 */
type Position = {
  /** x座標 */
  x: number;
  /** y座標 */
  y: number;
};

/** ベースとなる線の長さ */
const BaseLength = 100;

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
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(BaseLength, 0, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.#line = new THREE.Line(geometry, material);
  }

  /**
   * 引数の点A、点Bを結ぶ線を引き出し線とする
   * @param a 点A
   * @param b 点B
   */
  set(a: Position, b: Position): void {
    this.#line.position.x = a.x;
    this.#line.position.y = a.y;
    const length = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    this.#line.scale.x = length / BaseLength;
    const radian = Math.atan2(b.y - a.y, b.x - a.x);
    this.#line.rotation.z = radian;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#line;
  }
}
