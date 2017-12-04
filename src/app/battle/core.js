// @flow

import {BattleView} from "./view";
import type {BattleAppState} from "./state";
import type {Resources} from "../../resource/resource-manager";
import type {BattleState, PlayerId} from "gbraver-burst-core/lib/flow-type";
import type {Observer} from "../observer";

/** コンストラクタのパラメータ */
type Props = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** 戦闘状態 */
  battleState: BattleState,
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
  /** オブザーバ */
  observer: Observer,
};

/** 戦闘画面のコア */
export class BattleAppCore {
  /** ビュー */
  view: BattleView;
  /** 戦闘画面全体の状態 */
  state: BattleAppState;

  constructor(props: Props) {
    this.state = {
      battleState: props.battleState,
      playerId: props.playerId
    };
    this.view = new BattleView({
      resources: props.resources,
      state: this.state,
      observer: props.observer
    });
  }
}