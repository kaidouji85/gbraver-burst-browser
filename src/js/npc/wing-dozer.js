// @flow

import type {NPC} from "./npc";
import type {Armdozer, Command, GameState, PlayerId, PlayerState} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core";

/** 0バッテリー */
const ZERO_BATTERY = {
  type: 'BATTERY_COMMAND',
  battery: 0
};

/**
 * ウィングドーザ NPC
 */
export class WingDozerNPC implements NPC {
  /**
   * アームドーザ
   */
  armdozer: Armdozer;

  constructor() {
    this.armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.WING_DOZER) || ArmDozers[0];
  }

  /**
   * ルーチン
   *
   * @param enemyId NPCのプレイヤーID
   * @param gameStateHistory ステートヒストリー
   * @return コマンド
   */
  routine(enemyId: PlayerId, gameStateHistory: GameState[]): Command {
    if (gameStateHistory.length <= 0) {
      return ZERO_BATTERY;
    }

    const lastState = gameStateHistory[gameStateHistory.length - 1];
    if (lastState.effect.name !== 'InputCommand') {
      return ZERO_BATTERY;
    }

    const enableCommand = lastState.effect.players.find(v => v.playerId === enemyId);
    const enemy = lastState.players.find(v => v.playerId === enemyId);
    if (!enableCommand || !enemy) {
      return ZERO_BATTERY;
    }

    if (enableCommand.selectable === false) {
      return enableCommand.nextTurnCommand;
    }

    const isAttacker = lastState.activePlayerId === enemyId;
    return isAttacker
      ? this._attackRoutine(enemy, enableCommand.command)
      : this._defenseRoutine(enemy, enableCommand.command);
  }

  /**
   * 攻撃ルーチン
   *
   * @param own NPCのステータス
   * @param commands 選択可能なコマンド
   * @return コマンド
   */
  _attackRoutine(own: PlayerState, commands: Command[]): Command {
    const burst = commands.find(v => v.type === 'BURST_COMMAND');
    const battery1 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
    const battery3 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 3);
    const batteryMaxMinus1 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === (own.armdozer.battery - 1));
    const hasContinuousActive = this._hasContinuousActive(own);

    if (burst) {
      return burst;
    }

    if (burst && battery3) {
      return battery3;
    }

    if (hasContinuousActive && battery1) {
      return battery1;
    }

    if (batteryMaxMinus1) {
      return batteryMaxMinus1;
    }

    return ZERO_BATTERY;
  }

  /**
   * 防御ルーチン
   *
   * @param own NPCのステータス
   * @param commands 選択可能なコマンド
   * @return コマンド
   */
  _defenseRoutine(own: PlayerState, commands: Command[]): Command {
    const burst = commands.find(v => v.type === 'BURST_COMMAND');
    const battery1 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
    const maxBattery = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === own.armdozer.battery);
    const hasContinuousActive = this._hasContinuousActive(own);

    if (burst) {
      return burst;
    }

    if (maxBattery && hasContinuousActive) {
      return maxBattery;
    }

    if (battery1) {
      return battery1;
    }

    return ZERO_BATTERY;
  }

  _hasContinuousActive(own: PlayerState): boolean {
    return own.armdozer.effects
      .filter(v => v.type === 'ContinuousActivePlayer')
      .length > 0;
  }
}
