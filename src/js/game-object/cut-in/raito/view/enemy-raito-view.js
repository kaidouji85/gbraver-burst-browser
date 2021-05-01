// @flow

import {PlayerRaitoView} from "./player-raito-view";
import type {Resources} from "../../../../resource";
import type {RaitoModel} from "../model/raito-model";
import type {PreRender} from "../../../../game-loop/pre-render";

/**
 * 敵側 ライト ビュー
 */
export class EnemyRaitoView extends PlayerRaitoView {

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
   * @param preRender プリレンダー情報
   */
  engage(model: RaitoModel, preRender: PreRender) {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
    target.position.x *= -1;
  }
}