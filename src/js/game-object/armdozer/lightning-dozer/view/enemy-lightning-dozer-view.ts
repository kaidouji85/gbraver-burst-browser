import type { Resources } from "../../../../resource";
import type { LightningDozerModel } from "../model/lightning-dozer-model";
import { PlayerLightingDozerView } from "./player-lighting-dozer-view";

/**
 * 敵側のライトニングドーザビュー
 */
export class EnemyLightningDozerView extends PlayerLightingDozerView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
    this.statusIconPosition.x *= -1;
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerModel): void {
    super.engage(model);
    const target = this.getObject3D();
    target.position.x *= -1;
    target.scale.x = -1;
  }
}
