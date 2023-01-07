import type { Resources } from "../../../resource";
import type { DamageHalvedModel } from "../model/damage-halved-model";
import { PlayerDamageHalvedView } from "./player-damage-halved-view";

/** 敵 ダメージ半減 ビュー */
export class EnemyDamageHalvedView extends PlayerDamageHalvedView {
  /**
   * コンストラクタ
   * @param resources
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: DamageHalvedModel): void {
    super.engage(model);
    const target = super.getObject3D();
    target.position.x *= -1;
  }

}