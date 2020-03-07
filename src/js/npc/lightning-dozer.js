// @flow

import type {NPC} from "./npc";
import type {Command, GameState, PlayerId, PlayerState} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers} from "gbraver-burst-core";

const ZERO_BATTERY = {
  type: 'BATTERY_COMMAND',
  battery: 0
};

/** ライトニングドーザ NPC */
export const LightningDozerNPC: NPC = {
  armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.LIGHTNING_DOZER) || ArmDozers[0],

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
    return isAttacker ? attackRoutine(enemy, enableCommand.command) : defenseRoutine(enemy, enableCommand.command);
  }
};

/** 攻撃ルーチン */
function attackRoutine(enemy: PlayerState, command: Command[]): Command {
  const battery3 = command.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 3);

  if (battery3) {
    return battery3;
  }

  return ZERO_BATTERY;
}

/** 防御ルーチン */
function defenseRoutine(enemy: PlayerState, command: Command[]): Command {
  const battery1 = command.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 1);
  const battery2 = command.find(v => v.type === 'BATTERY_COMMAND' && v.battery === 2);
  if (battery2) {
    return battery2;
  }

  if (battery1) {
    return battery1;
  }

  return ZERO_BATTERY;
}