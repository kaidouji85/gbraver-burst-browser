import type { Resources } from "../../../resource";
import type { IneffectiveModel } from "../model/ineffective-model";
import { PlayerIneffectiveView } from "./player-ineffective-view";

/** 敵 効果無効 ビュー */
export class EnemyIneffectiveView extends PlayerIneffectiveView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: IneffectiveModel): void {
    super.engage(model);
    const target = super.getObject3D();
    target.position.x *= -1;
  }
}
