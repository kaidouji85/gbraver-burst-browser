import type { Armdozer, Command, Pilot, PlayerState } from "gbraver-burst-core";

import type { NPC, NPCRoutineParams } from "./npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0,
};

/** シンプルなルーチンに渡されるデータ */
export type SimpleRoutineData = {
  /** NPCが選択できるコマンド */
  commands: Command[];
  /** NPCの最新ステート */
  enemy: PlayerState;
  /** プレイヤーの最新ステート */
  player: PlayerState;
  /** プレイヤーが出したコマンド */
  playerCommand: Command;
};

/**
 * シンプルなルーチン
 * @param data ルーチンに渡すデータ
 * @returns NPCが選択するコマンド
 */
export type SimpleRoutine = (data: SimpleRoutineData) => Command;

/** シンプルな実装のNPC */
export class SimpleNPC implements NPC {
  /** @override */
  armdozer: Armdozer;
  /** @override */
  pilot: Pilot;
  /** 攻撃ルーチン */
  attackRoutine: SimpleRoutine;
  /** 防御ルーチン */
  defenseRoutine: SimpleRoutine;

  /**
   * コンストラクタ
   * @param armdozer NPCのアームドーザ
   * @param pilot NPCのパイロット
   * @param attackRoutine 攻撃ルーチン
   * @param defenseRoutine 防御ルーチン
   */
  constructor(
    armdozer: Armdozer,
    pilot: Pilot,
    attackRoutine: SimpleRoutine,
    defenseRoutine: SimpleRoutine,
  ) {
    this.armdozer = armdozer;
    this.pilot = pilot;
    this.attackRoutine = attackRoutine;
    this.defenseRoutine = defenseRoutine;
  }

  /** @override */
  routine(params: NPCRoutineParams): Command {
    const { gameStateHistory, enemyId, playerCommand } = params;
    const lastState = gameStateHistory.at(-1);
    if (!lastState) {
      return ZERO_BATTERY;
    }

    if (lastState.effect.name !== "InputCommand") {
      return ZERO_BATTERY;
    }

    const enemyCommand = lastState.effect.players.find(
      (v) => v.playerId === enemyId,
    );
    const enemy = lastState.players.find((v) => v.playerId === enemyId);
    const player = lastState.players.find((v) => v.playerId !== enemyId);
    if (!enemyCommand || !enemy || !player) {
      return ZERO_BATTERY;
    }

    if (!enemyCommand.selectable) {
      return enemyCommand.nextTurnCommand;
    }

    const commands: Command[] = enemyCommand.command;
    const isAttacker = lastState.activePlayerId === enemyId;
    const routineData: SimpleRoutineData = {
      commands,
      enemy,
      player,
      playerCommand,
    };
    return isAttacker
      ? this.attackRoutine(routineData)
      : this.defenseRoutine(routineData);
  }
}
