import * as THREE from "three";

import { SPRITE_RENDER_ORDER } from "../../../render/render-order/td-render-order";
import { LeadLineModel } from "../model/lead-line-model";
import { PreRender } from "../../../game-loop/pre-render";
import { HUDLeadLineScale } from "../../scale";

/** ベースとなる線の長さ */
const BaseLength = 100;

/** 引き出し線ビュー */
export class LeadLineView {
  /** メッシュ */
  #mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  /** 不透明度係数 */
  #opacityCoefficient: number;

  /**
   * コンストラクタ
   * @param color 線の色
   * @param width 線の太さ
   * @param opacityCoefficient 不透明度係数
   */
  constructor(
    color: THREE.ColorRepresentation,
    width: number,
    opacityCoefficient: number
  ) {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(BaseLength, 0, 0),
      new THREE.Vector3(0, width / 2, 0),
      new THREE.Vector3(0, -width / 2, 0),
    ]);
    const material = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
    this.#mesh.renderOrder = SPRITE_RENDER_ORDER;
    this.#opacityCoefficient = opacityCoefficient;
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
   * @param preRender プリレンダー
   */
  engage(model: Readonly<LeadLineModel>, preRender: Readonly<PreRender>): void {
    const length = Math.sqrt(
      (model.end.x - model.start.x) ** 2 + (model.end.y - model.start.y) ** 2
    );
    this.#mesh.scale.x = length / BaseLength;
    this.#mesh.scale.y = HUDLeadLineScale(      
      preRender.rendererDOM,
      preRender.safeAreaInset);
    this.#mesh.position.x = model.start.x;
    this.#mesh.position.y = model.start.y;
    this.#mesh.rotation.z = Math.atan2(
      model.end.y - model.start.y,
      model.end.x - model.start.x
    );
    this.#mesh.material.opacity = model.opacity * this.#opacityCoefficient;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }
}
