// @flow

import {PlayerWingDozerCutInView} from "./player-wing-dozer-cutin-view";
import type {Resources} from "../../../../resource";
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";

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
   */
  engage(model: WingDozerCutInModel): void {
    super.engage(model);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}