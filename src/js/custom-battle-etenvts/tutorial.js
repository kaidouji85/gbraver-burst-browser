// @flow
import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {
  BatteryCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
} from "../game/td-scenes/battle/custom-battle-event";
import type {NPC} from "../npc/npc";
import {oneBatteryNeoLandozerNPC} from "../npc/one-battery";
import {playerUuid} from "../uuid/player";
import {attentionBatterySelector} from "./attention";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";
import {waitUntilWindowPush} from "./wait-until-window-push";

/** チュートリアルイベント */
export interface TutorialEvent extends CustomBattleEvent {
  /** プレイヤー情報 */
  player: Player;
  /** NPC */
  npc: NPC;
}

/** チュートリアルイベントの実装 */
class SimpleTutorialEvent extends EmptyCustomBattleEvent implements TutorialEvent {
  player: Player;
  npc: NPC;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
    const pilot = Pilots.find(v => v.id === PilotIds.SHINYA)  ?? Pilots[0];
    this.player = {playerId: playerUuid(), armdozer, pilot};
    this.npc = oneBatteryNeoLandozerNPC();
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
      const ruleExpression = async () => {
        props.view.dom.messageWindow.position('Center');
        props.view.dom.messageWindow.visible(true);
        props.view.dom.messageWindow.messages(['何らかしらのルール説明']);
        await waitUntilWindowPush(props);
        props.view.dom.messageWindow.visible(false);
      };

    const lastState = props.stateHistory[props.stateHistory.length - 1];
    if (lastState.effect.name === 'InputCommand') {
      await ruleExpression();
    }
  }

  /** @override */
  async onLastState(props: LastState): Promise<void> {
    const pleaseBatterySelect = async () => {
      attentionBatterySelector(props.view);
      props.view.dom.messageWindow.position('Left');
      props.view.dom.messageWindow.visible(true);
      props.view.dom.messageWindow.messages(['好きなバッテリーを選択してね']);
      await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
    };

    const lastState = props.stateHistory[props.stateHistory.length - 1];
    if (lastState.effect.name === 'InputCommand') {
      await pleaseBatterySelect();
    }
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const zeroBatteryProhibited = async (): Promise<CommandCanceled> => {
      props.view.dom.messageWindow.visible(true);
      props.view.dom.messageWindow.messages(['ごめんね、バッテリーは0以上にしてね']);
      return {isCommandCanceled: true};
    };
    const progressGame = async (): Promise<CommandCanceled> => {
      props.view.dom.messageWindow.visible(false);
      props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
      return {isCommandCanceled: false};
    };

    if (props.battery.battery === 0) {
      return await zeroBatteryProhibited();
    }
    return await progressGame();
  }

  /** @override */
  async onBurstCommandSelected(): Promise<CommandCanceled> {
    return {isCommandCanceled: true};
  }

  /** @override */
  async onPilotSkillCommandSelected(): Promise<CommandCanceled> {
    return {isCommandCanceled: true};
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