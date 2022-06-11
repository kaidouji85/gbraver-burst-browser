// @flow

import type {PreRender} from "../../../../game-loop/pre-render";
import type {Resources} from "../../../../resource";
import type {NeoLandozerCutInModel} from "../model/neo-landozer-cutin-model";
import {PlayerNeoLandozerCutInView} from "./player-neo-landozer-cutin-view";

/**
 * 敵側 ネオランドーザ カットイン ビュー
 */
export class EnemyNeoLandozerCutInView extends PlayerNeoLandozerCutInView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: NeoLandozerCutInModel, preRender: PreRender): void {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}