// @flow

import type {Listener} from "../base/listener";
import type {BattleSceneAction} from "./action/index";

/** 戦闘シーンアクションリスナー */
export type BattleSceneListener = Listener<BattleSceneAction>;