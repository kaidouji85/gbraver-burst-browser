// @flow

import type {StartBattleScene} from "./start-battle-scene";
import type {ChangeBattery} from "./change-battery";
import type {DecideBattery} from "./decide-battery";
import type {DoBurst} from "./do-burst";
import type {DoPilotSkill} from "./do-pilot-skill";
import type {EndBattle} from "./end-battle";

/** 戦闘シーンアクション */
export type BattleSceneAction =
  StartBattleScene
  | EndBattle
  | ChangeBattery
  | DecideBattery
  | DoBurst
  | DoPilotSkill;
