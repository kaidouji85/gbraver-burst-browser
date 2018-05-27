// @flow

/** 戦闘シーン開始 */
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

export type StartBattleScene = {
  type: 'startBattleScene',
  initialState: GameState[]
};