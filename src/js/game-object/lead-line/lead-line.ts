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
  /** メッシュ */
  #mesh: THREE.Mesh;

  /**
   * コンストラクタ
   * @param color 線の色
   * @param width 線の太さ
   */
  constructor(color: THREE.ColorRepresentation = 0x0000ff, width = 3) {
    const geometry = new THREE.PlaneGeometry(BaseLength, width);
    const material = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
  }

  /**
   * 引数の点A、点Bを結ぶ線を引き出し線とする
   * @param a 点A
   * @param b 点B
   */
  set(a: Position, b: Position): void {
    const length = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    this.#mesh.scale.x = length / BaseLength;
    this.#mesh.position.x = a.x + (b.x - a.x) / 2;
    this.#mesh.position.y = a.y + (b.y - a.y) / 2;
    const radian = Math.atan2(b.y - a.y, b.x - a.x);
    this.#mesh.rotation.z = radian;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }
}
