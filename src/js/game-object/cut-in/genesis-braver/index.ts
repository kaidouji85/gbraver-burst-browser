import { Resources } from "../../../resource";
import { GenesisBraverCutIn } from "./genesis-braver-cutin";
import { PlayerGenesisBraverCutInView } from "./view/player-genesis-braver-cutin-view";

/**
 * プレイヤー ジェネシスブレイバー カットイン を生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function playerGenesisBraverCutIn(resources: Resources): GenesisBraverCutIn {
  const view = new PlayerGenesisBraverCutInView(resources);
  return new GenesisBraverCutIn(view);
}