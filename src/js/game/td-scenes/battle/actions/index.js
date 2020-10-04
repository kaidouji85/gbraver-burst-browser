// @flow

import type {StartBattleScene} from "./start-battle-scene";
import type {ChangeBattery} from "./change-battery";
import type {DecideBattery} from "./decide-battery";
import type {DoBurst} from "./do-burst";
import type {DoPilotSkill} from "./do-pilot-skill";

/** 戦闘シーンアクション */
export type BattleSceneAction =
  StartBattleScene
  | ChangeBattery
  | DecideBattery
  | DoBurst
  | DoPilotSkill;
