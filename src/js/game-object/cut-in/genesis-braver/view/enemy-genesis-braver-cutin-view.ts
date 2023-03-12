import { PreRender } from "../../../../game-loop/pre-render";
import { Resources } from "../../../../resource";
import { GenesisBraverCutInModel } from "../model/genesis-braver-cutin-model";
import { PlayerGenesisBraverCutInView } from "./player-genesis-braver-cutin-view";

/** 敵 ジェネシスブレイバー カットイン ビュー */
export class EnemyGenesisBraverCutInView extends PlayerGenesisBraverCutInView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: GenesisBraverCutInModel, preRender: PreRender): void {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}
