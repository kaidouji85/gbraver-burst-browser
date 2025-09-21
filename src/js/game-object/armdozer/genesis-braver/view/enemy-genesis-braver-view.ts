import type { Resources } from "../../../../resource";
import type { GenesisBraverModel } from "../model/genesis-braver-model";
import { PlayerGenesisBraverView } from "./player-genesis-braver-view";

/** 敵ジェネシスブレイバービュー */
export class EnemyGenesisBraverView extends PlayerGenesisBraverView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
    this.statusIconPosition.x *= -1;
  }

  /** @override */
  engage(model: GenesisBraverModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
    this.getObject3D().scale.x = -1;
  }
}
