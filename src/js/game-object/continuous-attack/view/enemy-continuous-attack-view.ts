import type { Resources } from "../../../resource";
import type { ContinuousAttackModel } from "../model/continuous-attack-model";
import { PlayerContinuousAttackView } from "./player-continuous-attack-view";

/** 敵 攻撃アップ ビュー */
export class EnemyContinuousAttackView extends PlayerContinuousAttackView {

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: ContinuousAttackModel): void {
    super.engage(model);
    const target = super.getObject3D();
    target.position.x *= -1;
  }
}
