import * as THREE from "three";

import { SPRITE_RENDER_ORDER } from "../../../render/render-order/td-render-order";
import { LeadLineModel } from "../model/lead-line-model";

/** ベースとなる線の長さ */
const BaseLength = 100;

/** 引き出し線ビュー */
export class LeadLineView {
  /** メッシュ */
  #mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

  /**
   * コンストラクタ
   * @param color 線の色
   * @param width 線の太さ
   */
  constructor(color: THREE.ColorRepresentation, width: number) {
    const geometry = new THREE.PlaneGeometry(BaseLength, width);
    const material = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
    this.#mesh.renderOrder = SPRITE_RENDER_ORDER;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.material.dispose();
    this.#mesh.geometry.dispose();
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: Readonly<LeadLineModel>): void {
    const length = Math.sqrt(
      (model.end.x - model.start.x) ** 2 + (model.end.y - model.start.y) ** 2
    );
    this.#mesh.scale.x = length / BaseLength;
    this.#mesh.position.x = model.start.x + (model.end.x - model.start.x) / 2;
    this.#mesh.position.y = model.start.y + (model.end.y - model.start.y) / 2;
    this.#mesh.rotation.z = Math.atan2(
      model.end.y - model.start.y,
      model.end.x - model.start.x
    );
    this.#mesh.material.opacity = 0;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }
}
