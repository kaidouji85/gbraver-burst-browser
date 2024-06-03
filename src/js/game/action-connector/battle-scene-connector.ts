import { map } from "rxjs";

import { BattleScene } from "../../td-scenes/battle";
import { TDSceneActionConnector } from "../../td-scenes/td-scene-binder/action-connector";
import { GameActionManageContainer } from "../game-props/game-action-manage-container";

/**
 * 戦闘シーンのゲームアクションコネクタを生成する
 * @param props ゲームアクション管理コンテナ
 * @returns ゲームアクションコネクタ
 */
export const battleSceneConnector =
  (props: GameActionManageContainer): TDSceneActionConnector<BattleScene> =>
  (scene: BattleScene) =>
    props.gameAction.connect([
      scene.notifyGameEnd().pipe(map((a) => ({ ...a, type: "EndBattle" }))),
    ]);
