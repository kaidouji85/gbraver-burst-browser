// @flow

import type { Resources } from "../../../resource";
import type { Stream } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import { GenesisBraver } from "./genesis-braver";
import { PlayerGenesisBraverView } from "./view/player-genesis-braver-view";

/**
 * プレイヤージェネシスブレイバーを生成
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerGenesisBraver(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>
): GenesisBraver {
  const view = new PlayerGenesisBraverView(resources);
  return new GenesisBraver(view, resources, gameObjectAction);
}
