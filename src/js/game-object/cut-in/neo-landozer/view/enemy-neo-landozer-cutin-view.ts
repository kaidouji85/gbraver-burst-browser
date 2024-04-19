import type { PreRender } from "../../../../game-loop/pre-render";
import type { Resources } from "../../../../resource";
import type { NeoLandozerCutInModel } from "../model/neo-landozer-cutin-model";
import { PlayerNeoLandozerCutInView } from "./player-neo-landozer-cutin-view";

/** 敵側 ネオランドーザ カットイン ビュー */
export class EnemyNeoLandozerCutInView extends PlayerNeoLandozerCutInView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: NeoLandozerCutInModel, preRender: PreRender): void {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}
