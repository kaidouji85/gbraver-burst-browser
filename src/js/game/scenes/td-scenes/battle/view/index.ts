import { Observable } from "rxjs";

import { BattleSceneAction } from "../actions";
import {
  BattleSceneViewPropsCreatorParams,
  createBattleSceneViewProps,
} from "./procedure/create-battle-scene-props";
import { destructor } from "./procedure/destructor";
import { battleActionNotifier as notifyBattleAction } from "./procedure/notify-battle-action";
import { onGameLoop } from "./procedure/on-game-loop";
import { BattleSceneLayers } from "./props";

/** 戦闘画面のビュー */
export type BattleSceneView = BattleSceneLayers & {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * 戦闘シーンアクションを通知する
   * @returns 通知ストリーム
   */
  notifyBattleAction(): Observable<BattleSceneAction>;
};

/** 生成パラメータ */
type BattleViewCreatorParams = BattleSceneViewPropsCreatorParams;

/**
 * BattleSceneViewを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createBattleSceneView(
  params: BattleViewCreatorParams,
): BattleSceneView {
  const { gameLoop } = params;
  const props = createBattleSceneViewProps(params);
  const unsubscriber = gameLoop.subscribe((action) => {
    onGameLoop(props, action);
  });
  return {
    ...props,
    destructor: () => {
      destructor(props);
      unsubscriber.unsubscribe();
    },
    notifyBattleAction: () => notifyBattleAction(props),
  };
}
