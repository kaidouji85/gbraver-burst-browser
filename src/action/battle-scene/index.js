// @flow
import type {StartBattleScene} from "./start-battle-scene";
import type {ChangeBattery} from "./change-battery";

/** 戦闘シーンアクション一覧 */
export type BattleSceneAction =
  StartBattleScene
  | ChangeBattery;
