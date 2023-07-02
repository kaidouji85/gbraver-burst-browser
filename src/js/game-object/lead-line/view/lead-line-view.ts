import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { HUDLeadLineScale } from "../../scale";
import { LeadLineModel } from "../model/lead-line-model";
import { createLine } from "./line";
import {BaseLineLength} from "./base-line-length";

/** 引き出し線ビュー */
export class LeadLineView {
  /** グループ */
  #group: THREE.Group;
  /** 線メッシュ */
  #line: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
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
    this.#group = new THREE.Group();
    this.#line = createLine(color, width);
    this.#group.add(this.#line);
    this.#opacityCoefficient = opacityCoefficient;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#line.material.dispose();
    this.#line.geometry.dispose();
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
    this.#group.scale.x = length / BaseLineLength;
    this.#group.scale.y = HUDLeadLineScale(
      preRender.rendererDOM,
      preRender.safeAreaInset
    );
    this.#group.position.x = model.start.x;
    this.#group.position.y = model.start.y;
    this.#group.rotation.z = Math.atan2(
      model.end.y - model.start.y,
      model.end.x - model.start.x
    );
    this.#line.material.opacity = model.opacity * this.#opacityCoefficient;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }
}
