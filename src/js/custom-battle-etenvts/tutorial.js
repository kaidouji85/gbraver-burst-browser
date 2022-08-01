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
    const introduction = async () => {
      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.faceVisible(true);
      props.view.dom.leftMessageWindow.face('Tsubasa');
      props.view.dom.leftMessageWindow.lighten();
      await scrollLeftMessages(props, [
        ['ツバサ', '「これより 操縦訓練を開始する'],
        ['姿勢を正して 礼!!」']
      ]);
      props.view.dom.leftMessageWindow.darken();

      props.view.dom.rightMessageWindow.visible(true);
      props.view.dom.rightMessageWindow.faceVisible(true);
      props.view.dom.rightMessageWindow.face('Shinya');
      props.view.dom.rightMessageWindow.lighten();
      await scrollRightMessages(props, [
        ['シンヤ', '「よろしくお願いします」']
      ]);
      props.view.dom.rightMessageWindow.darken();

      props.view.dom.leftMessageWindow.lighten();
      await scrollLeftMessages(props, [
        ['ツバサ', '「いい返事だな では早速はじめよう'],
        ['試合の基本は 攻撃側 防御側でバッテリーを出し合うことだ'],
        ['大きいバッテリーを出した側の行動が成功するのだが'],
        ['これは実際にやってみた方が早いな'],
        ['シンヤ 私が防御に回るから 好きに攻撃してみろ」']
      ]);
      props.view.dom.leftMessageWindow.darken();

      props.view.dom.rightMessageWindow.lighten();
      await scrollRightMessages(props, [
        ['シンヤ', '「了解っす '],
        ['それじゃ 遠慮なく いきますよ ツバサ先輩」'],
      ]);

      props.view.dom.leftMessageWindow.visible(false);
      props.view.dom.rightMessageWindow.visible(false);
    };
    const attackHit = async () => {
      props.view.dom.rightMessageWindow.visible(true);
      props.view.dom.rightMessageWindow.faceVisible(true);
      props.view.dom.rightMessageWindow.face('Shinya');
      props.view.dom.rightMessageWindow.lighten();
      await scrollRightMessages(props, [
        ['シンヤ', '「手応えあり」']
      ]);
      props.view.dom.rightMessageWindow.darken();

      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.faceVisible(true);
      props.view.dom.leftMessageWindow.face('Tsubasa');
      props.view.dom.leftMessageWindow.lighten();
      await scrollLeftMessages(props, [
        ['ツバサ', '「見事な攻撃だ シンヤ'],
        ['君が私よりも大きいバッテリーを出したので'],
        ['攻撃がヒットしたぞ」'],
      ]);
      props.view.dom.leftMessageWindow.darken();
    };
    const attackGuarded = async () => {
      props.view.dom.rightMessageWindow.visible(true);
      props.view.dom.rightMessageWindow.faceVisible(true);
      props.view.dom.rightMessageWindow.face('Shinya');
      props.view.dom.rightMessageWindow.lighten();
      await scrollRightMessages(props, [
        ['シンヤ', '「よっしゃ 攻撃ヒット」']
      ]);
      props.view.dom.rightMessageWindow.darken();

      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.faceVisible(true);
      props.view.dom.leftMessageWindow.face('Tsubasa');
      props.view.dom.leftMessageWindow.lighten();
      await scrollLeftMessages(props, [
        ['ツバサ', '「甘いぞ シンヤ」'],
        ['君は私と同じバッテリーを出したので 攻撃をガード'],
        ['つまりは ダメージを半減させてもらった」'],
      ]);
      props.view.dom.leftMessageWindow.darken();
    }
    const attackMiss = async () => {
      props.view.dom.rightMessageWindow.visible(true);
      props.view.dom.rightMessageWindow.faceVisible(true);
      props.view.dom.rightMessageWindow.face('Shinya');
      props.view.dom.rightMessageWindow.lighten();
      await scrollRightMessages(props, [
        ['シンヤ', '「クソッ 避けられた」']
      ]);
      props.view.dom.rightMessageWindow.darken();

      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.faceVisible(true);
      props.view.dom.leftMessageWindow.face('Tsubasa');
      props.view.dom.leftMessageWindow.lighten();
      await scrollLeftMessages(props, [
        ['ツバサ', '「まだまだ だな シンヤ」'],
        ['私の方が君より大きいバッテリーを出したので'],
        ['攻撃を回避させてもらった」'],
      ]);
      props.view.dom.leftMessageWindow.darken();
    };

    this.stateHistory = [...this.stateHistory, ...props.update];
    const turn = turnCount(this.stateHistory);
    if (turn === 1) {
      await introduction();
    }

    const lastBattle = props.update.find(v => v.effect.name === 'Battle');
    if (lastBattle && lastBattle.effect.name === 'Battle') {
      const isAttacker = lastBattle.activePlayerId === this.player.playerId;
      if (isAttacker && !lastBattle.effect.isDeath
        && (lastBattle.effect.result.name === 'NormalHit' || lastBattle.effect.result.name === 'CriticalHit')) {
        await attackHit();
      } else if (isAttacker && lastBattle.effect.result.name === 'Guard') {
        await attackGuarded();
      } else if (isAttacker && (lastBattle.effect.result.name === 'Miss' || lastBattle.effect.result.name === 'Feint')) {
        await attackMiss();
      }
    }
  }

  /** @override */
  async onLastState(props: LastState): Promise<void> {
    const attackBatterySelect = async () => {
      attentionBatterySelector(props.view);
      props.view.dom.rightMessageWindow.visible(false);
      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.faceVisible(false);
      props.view.dom.leftMessageWindow.lighten();
      props.view.dom.leftMessageWindow.messages([
        '好きなバッテリーで 攻撃してみよう',
        'ツバサ先輩よりも 大きい数字を出せば 攻撃が当たるぞ'
      ]);
      await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
    };
    const defenseBatterySelect = async () => {
      attentionBatterySelector(props.view);
      props.view.dom.rightMessageWindow.visible(false);
      props.view.dom.leftMessageWindow.visible(true);
      props.view.dom.leftMessageWindow.faceVisible(false);
      props.view.dom.leftMessageWindow.lighten();
      props.view.dom.leftMessageWindow.messages([
        '好きなバッテリーで 防御してみよう',
        'ツバサ先輩よりも 大きい数字を出せば 完全回避できるぞ'
      ]);
      await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
    };

    const lastState = props.update[props.update.length - 1];
    const isMyTurn = lastState.activePlayerId === this.player.playerId;
    if (lastState.effect.name === 'InputCommand' && isMyTurn) {
      await attackBatterySelect();
    } else if (lastState.effect.name === 'InputCommand' && !isMyTurn) {
      await defenseBatterySelect();
    }
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const progressGame = async (): Promise<CommandCanceled> => {
      props.view.dom.leftMessageWindow.visible(false);
      props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
      return {isCommandCanceled: false};
    };
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