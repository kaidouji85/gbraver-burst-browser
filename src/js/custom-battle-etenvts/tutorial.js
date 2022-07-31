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
import {scrollLeftMessages, scrollRightMessages} from "./scroll-messages";

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
      await scrollLeftMessages(props, [
        ['ツバサ', '「これより操縦訓練を開始する。'],
        ['姿勢を正して、礼!!」']
      ]);
      props.view.dom.leftMessageWindow.darken();

      props.view.dom.rightMessageWindow.visible(true);
      props.view.dom.rightMessageWindow.faceVisible(true);
      props.view.dom.rightMessageWindow.face('Shinya');
      await scrollRightMessages(props, [
        ['シンヤ', '「よろしくお願いします。」']
      ]);
      props.view.dom.rightMessageWindow.darken();

      props.view.dom.leftMessageWindow.lighten();
      await scrollLeftMessages(props, [
        ['ツバサ', '「いい返事だな、では早速はじめよう。'],
        ['試合の基本は、攻撃側、防御側でバッテリーを出し合うことだ。'],
        ['大きいバッテリーを出した側の行動が成功するのだが、'],
        ['これは実際にやってみた方が早いな。'],
        ['シンヤ、私が防御に回るから、好きに攻撃してみろ。」']
      ]);
      props.view.dom.leftMessageWindow.darken();

      props.view.dom.rightMessageWindow.lighten();
      await scrollRightMessages(props, [
        ['シンヤ', '「了解っす。'],
        ['それじゃ遠慮なくいきますよ、ツバサ先輩。」'],
      ]);

      props.view.dom.leftMessageWindow.visible(false);
      props.view.dom.rightMessageWindow.visible(false);
    };

    this.stateHistory = [...this.stateHistory, ...props.update];
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
      props.view.dom.leftMessageWindow.lighten();
      props.view.dom.leftMessageWindow.messages([
        '好きなバッテリーで攻撃してみよう。', 
        'ツバサ先輩よりも大きい数字を出せば、攻撃が当たるぞ。'
      ]);
      await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
    };

    const lastState = props.update[props.update.length - 1];
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