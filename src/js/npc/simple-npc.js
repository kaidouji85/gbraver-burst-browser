// @flow

import type {Command, GameState, PlayerId, PlayerState, Armdozer, Pilot} from "gbraver-burst-core";
import type {NPC} from "./npc";

/** 0バッテリー */
const ZERO_BATTERY = {type: 'BATTERY_COMMAND', battery: 0};

/** シンプルなルーチンに渡されるデータ */
export type SimpleRoutineData = {
  /** NPCが選択できるコマンド */
  commands: Command[],
  /** NPCの最新ステート */
  enemy: PlayerState,
  /** プレイヤーの最新ステート */
  player: PlayerState,
};

/**
 * シンプルなルーチン
 *
 * @param data ルーチンに渡されるデータ
 * @return 選択するコマンド
 */
export type SimpleRoutine = (data: SimpleRoutineData) => Command;

/** シンプルな実装のNPC */
export class SimpleNPC implements NPC {
  armdozer: Armdozer;
  pilot: Pilot;
  attackRoutine: SimpleRoutine;
  defenseRoutine: SimpleRoutine;

  /**
   * コンストラクタ
   *
   * @param armdozer NPCのアームドーザ
   * @param pilot NPCのパイロット
   * @param attackRoutine 攻撃ルーチン
   * @param defenseRoutine 防御ルーチン
   */
  constructor(armdozer: Armdozer, pilot: Pilot, attackRoutine: SimpleRoutine, defenseRoutine: SimpleRoutine) {
    this.armdozer = armdozer;
    this.pilot = pilot;
    this.attackRoutine = attackRoutine;
    this.defenseRoutine = defenseRoutine;
  }

  /** @override */
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
    const player = lastState.players.find(v => v.playerId !== enemyId);
    if (!enableCommand || !enemy || !player) {
      return ZERO_BATTERY;
    }

    if (enableCommand.selectable === false) {
      return enableCommand.nextTurnCommand;
    }

    const commands: Command[] = enableCommand.command;
    const isAttacker = lastState.activePlayerId === enemyId;
    return isAttacker ? this.attackRoutine({commands, enemy, player}) : this.defenseRoutine({commands, enemy, player});
  }
}