import type { Resources } from "../../../../resource";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { PlayerShinBraverView } from "./player-shin-braver-view";

/**
 *  敵側シンブレイバー
 *  プレイヤー版のものを左右反転させただけである
 */
export class EnemyShinBraverView extends PlayerShinBraverView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
    this.statusIconPosition.x *= -1;
  }

  /** モデルをビューに反映させる */
  engage(model: ShinBraverModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
    this.getObject3D().scale.x = -1;
  }
}
