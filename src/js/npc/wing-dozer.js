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
    const battery4 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 4);
    const battery5 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 5);

    if (burst && battery5) {
      return battery5;
    }

    if (battery4) {
      return battery4;
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

    if (burst) {
      return burst;
    }

    if (battery1) {
      return battery1;
    }

    return ZERO_BATTERY;
  }
}
