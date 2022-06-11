// @flow

import type {PreRender} from "../../../../game-loop/pre-render";
import type {Resources} from "../../../../resource";
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";
import {PlayerWingDozerCutInView} from "./player-wing-dozer-cutin-view";

/**
 * 敵側 ウィングドーザ カットイン ビュー
 */
export class EnemyWingDozerCutInView extends PlayerWingDozerCutInView {
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
  engage(model: WingDozerCutInModel, preRender: PreRender): void {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}