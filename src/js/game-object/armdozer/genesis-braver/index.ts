import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { GenesisBraver } from "./genesis-braver";
import { EnemyGenesisBraverView } from "./view/enemy-genesis-braver-view";
import { PlayerGenesisBraverView } from "./view/player-genesis-braver-view";

/** ジェネシスブレイバー生成関数パラメータ */
type GenerateGenesisBraverParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤージェネシスブレイバーを生成
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function PlayerGenesisBraver(
  params: GenerateGenesisBraverParams,
): GenesisBraver {
  const { resources, gameObjectAction } = params;
  const view = new PlayerGenesisBraverView(resources);
  return new GenesisBraver(view, resources, gameObjectAction);
}

/**
 * 敵ジェネシスブレイバーを生成
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function EnemyGenesisBraver(
  params: GenerateGenesisBraverParams,
): GenesisBraver {
  const { resources, gameObjectAction } = params;
  const view = new EnemyGenesisBraverView(resources);
  return new GenesisBraver(view, resources, gameObjectAction);
}
