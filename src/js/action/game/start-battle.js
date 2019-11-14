// @flow

import type {Resources} from "../../resource";
import type {BattleRoom, InitialState} from "../../battle-room/battle-room";

/** 戦闘開始 */
export type StartBattle = {
  type: 'StartBattle',

  /** リソース管理オブジェクト */
  resources: Resources,

  /** 戦闘ルーム */
  room: BattleRoom,

  /** 戦闘の初期状態 */
  initialState: InitialState
};