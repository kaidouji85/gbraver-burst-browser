// @flow

import {PlayerWingDozerView} from "./player-wing-dozer-view";
import type {Resources} from "../../../../resource";
import type {WingDozerModel} from "../model/wing-dozer-model";

/**
 * 敵側 ウィングドーザ ビュー
 */
export class EnemyWingDozerView extends PlayerWingDozerView {
  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: WingDozerModel): void {
    super.engage(model);
    
    const object = super.getObject3D();
    object.position.x *= -1;
    object.scale.x = -1;
  }
}