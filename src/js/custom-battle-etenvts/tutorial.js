// @flow
import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {CustomBattleEvent, CustomBattleEventProps} from "../game/td-scenes/battle/custom-battle-event";
import type {NPC} from "../npc/npc";
import {oneBatteryNeoLandozerNPC} from "../npc/one-battery";
import {playerUuid} from "../uuid/player";
import {waitTime} from "../wait/wait-time";

/** チュートリアルイベント */
export interface TutorialEvent extends CustomBattleEvent {
  /** プレイヤー情報 */
  player: Player;
  /** NPC */
  npc: NPC;
}

/** チュートリアルイベントの実装 */
class SimpleTutorialEvent implements TutorialEvent {
  player: Player;
  npc: NPC;
  #turnCount: number;

  /**
   * コンストラクタ
   */
  constructor() {
    const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
    const pilot = Pilots.find(v => v.id === PilotIds.SHINYA)  ?? Pilots[0];
    this.player = {playerId: playerUuid(), armdozer, pilot};
    this.npc = oneBatteryNeoLandozerNPC();
    this.#turnCount = 1;
  }

  /** @override */
  async willLastState(props: CustomBattleEventProps): Promise<void> {
    this.#turnCount += props.stateHistory
      .filter(v => v.effect.name === 'TurnChange')
      .length;
    const isGameEnd = props.stateHistory
      .filter(v => v.effect.name === 'GameEnd')
      .length >= 1;
    props.view.dom.messageWindow.visible(true);
    const message = isGameEnd ? 'ゲーム終了' : `${this.#turnCount}ターン目`;
    props.view.dom.messageWindow.messages([message]);
    await waitTime(1000);
    props.view.dom.messageWindow.visible(false);
  }
}

/**
 * チュートリアルイベントを生成する
 *
 * @return チュートリアルイベント
 */
export function createTutorialEvent(): TutorialEvent {
  return new SimpleTutorialEvent();
}