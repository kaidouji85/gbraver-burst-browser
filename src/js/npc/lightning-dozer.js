// @flow

import type {NPC} from "./npc";
import type {Command, GameState, PlayerId, PlayerState} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core";
import type {Armdozer} from "gbraver-burst-core";

/** 0バッテリー */
const ZERO_BATTERY = {
  type: 'BATTERY_COMMAND',
  battery: 0
};

/** ライトニングドーザ NPC */
export class LightningDozerNPC implements NPC {
  /**
   * アームドーザ
   */
  armdozer: Armdozer;

  constructor() {
    this.armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.LIGHTNING_DOZER) || ArmDozers[0];
  }

  /**
   * 状態に応じたコマンドを返す
   *
   * @param enemyId 敵のプレイヤーID
   * @param gameStateHistory ゲーム状態のヒストリー
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
   * @param enemy NPCのステータス
   * @param commands 選択可能なコマンド
   * @return コマンド
   */
  _attackRoutine(enemy: PlayerState, commands: Command[]): Command {
    const fullAttack = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === enemy.armdozer.maxBattery);
    const burst = commands.find(v => v.type === 'BURST_COMMAND');
    const attackBattery = enemy.armdozer.battery - 1;
    const attack = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === attackBattery);

    if (fullAttack && burst) {
      return fullAttack;
    }

    if (attack) {
      return attack;
    }

    return ZERO_BATTERY;
  }

  /**
   * 防御ルーチン
   *
   * @param enemy NPCのステータス
   * @param commands 選択可能なコマンド
   * @return コマンド
   */
  _defenseRoutine(enemy: PlayerState, commands: Command[]): Command {
    const burst = commands.find(v => v.type === 'BURST_COMMAND');
    const battery1 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
    const battery3 = commands.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 3);
    const isFullBattery = enemy.armdozer.battery === enemy.armdozer.maxBattery;

    if (isFullBattery && burst && battery3) {
      return battery3;
    }

    if (burst) {
      return burst;
    }

    if (battery1) {
      return battery1;
    }

    return ZERO_BATTERY;
  }
}