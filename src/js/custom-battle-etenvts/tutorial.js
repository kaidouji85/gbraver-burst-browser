// @flow
import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {
  CustomBattleEvent,
  DidBatteryDecideEnd,
  DidBatteryDecideProps,
  WillLastStateProps
} from "../game/td-scenes/battle/custom-battle-event";
import type {NPC} from "../npc/npc";
import {oneBatteryNeoLandozerNPC} from "../npc/one-battery";
import {playerUuid} from "../uuid/player";
import {attentionBatterySelector} from "./attention";
import {waitUntilWindowPush} from "./wait-until-window-push";

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

  /**
   * コンストラクタ
   */
  constructor() {
    const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
    const pilot = Pilots.find(v => v.id === PilotIds.SHINYA)  ?? Pilots[0];
    this.player = {playerId: playerUuid(), armdozer, pilot};
    this.npc = oneBatteryNeoLandozerNPC();
  }

  /** @override */
  async willLastState(props: WillLastStateProps): Promise<void> {
    await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
    props.view.dom.messageWindow.visible(true);
    props.view.dom.messageWindow.messages(['好きなバッテリーを選択してね']);
    await waitUntilWindowPush(props);
    props.view.dom.messageWindow.visible(false);
    attentionBatterySelector(props.view);
  }

  /** @override */
  async didBatteryDecide(props: DidBatteryDecideProps): Promise<DidBatteryDecideEnd> {
    if (0 < props.battery.battery) {
      return {isBatteryCanceled: false};
    }

    props.view.dom.messageWindow.visible(true);
    props.view.dom.messageWindow.messages(['ごめんね、バッテリーは0以上にしてね']);
    await waitUntilWindowPush(props);
    props.view.dom.messageWindow.visible(false);
    return {isBatteryCanceled: true};
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