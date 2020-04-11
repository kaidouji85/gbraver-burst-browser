// @flow

import {PlayerNeoLandozerCutInView} from "./player-neo-landozer-cutin-view";
import type {Resources} from "../../../../resource";
import type {NeoLandozerCutInModel} from "../model/neo-landozer-cutin-model";

/**
 * 敵側 ネオランドーザ　カットイン ビュー
 */
export class EnemyNeoLandozerCutInView extends PlayerNeoLandozerCutInView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: NeoLandozerCutInModel): void {
    super.engage(model);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}