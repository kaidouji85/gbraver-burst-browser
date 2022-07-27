// @flow
import type {GameState, Player} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {
  BatteryCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
} from "../game/td-scenes/battle/custom-battle-event";
import type {NPC} from "../npc/npc";
import {oneBatteryWeakWingDozerNPC} from "../npc/one-battery";
import {playerUuid} from "../uuid/player";
import {attentionBatterySelector} from "./attention";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";
import {turnCount} from "./turn-count";
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
  stateHistory: GameState[];

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
    const pilot = Pilots.find(v => v.id === PilotIds.SHINYA)  ?? Pilots[0];
    this.player = {playerId: playerUuid(), armdozer, pilot};
    this.npc = oneBatteryWeakWingDozerNPC();
    this.stateHistory = [];
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    const oneTurn = async () => {
      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.faceVisible(true);
      props.view.dom.leftMessageWindow.face('Tsubasa');
      props.view.dom.leftMessageWindow.messages(['ツバサ', '「これより操縦訓練を開始する']);
      await waitUntilWindowPush(props);
      props.view.dom.leftMessageWindow.messages(['ツバサ', '「姿勢を正して、礼!!」']);
      await waitUntilWindowPush(props);
      props.view.dom.leftMessageWindow.darken();

      props.view.dom.rightMessageWindow.visible(true);
      props.view.dom.rightMessageWindow.faceVisible(true);
      props.view.dom.rightMessageWindow.face('Shinya');
      props.view.dom.rightMessageWindow.messages(['シンヤ', '「よろしくお願いします」']);
      await waitUntilWindowPush(props);
      props.view.dom.rightMessageWindow.darken();

      props.view.dom.leftMessageWindow.lighten();
      props.view.dom.leftMessageWindow.face('Tsubasa');
      props.view.dom.leftMessageWindow.messages(['ツバサ', '「いい返事だな、では早速はじめるぞ']);
      await waitUntilWindowPush(props);
    };


    this.stateHistory = [...this.stateHistory, ...props.stateHistory];
    const turn = turnCount(this.stateHistory)
    if (turn === 1) {
      await oneTurn();
    }
  }

  /** @override */
  async onLastState(props: LastState): Promise<void> {
    const pleaseBatterySelect = async () => {
      attentionBatterySelector(props.view);
      props.view.dom.rightMessageWindow.visible(false);
      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.faceVisible(false);
      props.view.dom.leftMessageWindow.messages(['好きなバッテリーを選択してね']);
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
      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.messages(['ごめんね、バッテリーは0以上にしてね']);
      return {isCommandCanceled: true};
    };
    const progressGame = async (): Promise<CommandCanceled> => {
      props.view.dom.leftMessageWindow.visible(false);
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