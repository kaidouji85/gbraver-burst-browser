import { Observable } from "rxjs";

import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { GenesisBraver } from "./genesis-braver";
import { EnemyGenesisBraverView } from "./view/enemy-genesis-braver-view";
import { PlayerGenesisBraverView } from "./view/player-genesis-braver-view";

/** ジェネシスブレイバー生成関数パラメータ */
type GenesisBraverCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * プレイヤージェネシスブレイバーを生成
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function PlayerGenesisBraver(
  params: GenesisBraverCreatorParams,
): GenesisBraver {
  const { resources } = params;
  const view = new PlayerGenesisBraverView(resources);
  return new GenesisBraver({ ...params, view });
}

/**
 * 敵ジェネシスブレイバーを生成
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function EnemyGenesisBraver(
  params: GenesisBraverCreatorParams,
): GenesisBraver {
  const { resources } = params;
  const view = new EnemyGenesisBraverView(resources);
  return new GenesisBraver({ ...params, view });
}
