// @flow

import type {PushAttackButton} from "./push-attack-button";
import type {StartBattleScene} from "./start-battle-scene";
import type {PushOkButton} from "./push-ok-button";

/** 戦闘シーンアクション一覧 */
export type BattleSceneAction =
  PushAttackButton |
  PushOkButton |
  StartBattleScene