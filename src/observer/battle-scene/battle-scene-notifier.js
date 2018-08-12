// @flow

import type {BattleSceneAction} from "../../action/battle-scene/index";
import type {Notifier} from "../base/notifier";

/** 戦闘シーンアクション通知者 */
export type BattleSceneNotifier = Notifier<BattleSceneAction>;
