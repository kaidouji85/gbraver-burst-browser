import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { findBatteryCommand } from "./find-battery-command";
import { findBurstCommand } from "./find-burst-command";
import { NPC } from "./npc";
import { SimpleNPC, SimpleRoutine, SimpleRoutineData } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = { type: "BATTERY_COMMAND", battery: 0 };

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const { enemy } = data;
  return { type: "BATTERY_COMMAND", battery: enemy.armdozer.battery };
};

/**
 * 防御ルーチンの条件オブジェクトを生成する
 * @param data ルーチンに渡すデータ
 * @returns 防御ルーチンの条件オブジェクト
 */
const getDefenseRoutineCondition = (data: SimpleRoutineData) => ({
  battery1: findBatteryCommand(1, data.commands),
  burst: findBurstCommand(data.commands),
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const { burst, battery1 } = getDefenseRoutineCondition(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (burst) {
    selectedCommand = burst;
  } else if (battery1) {
    selectedCommand = battery1;
  }

  return selectedCommand;
};

/**
 * サイドエピソード「超火力はガードで凌げ」 グランドーザ NPC
 * @returns NPC
 */
export function granDozerForSurviveSuperPowerWithGuardNPC(): NPC {
  const originArmdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.GRAN_DOZER) ?? Armdozers[0];
  const armdozer = { ...originArmdozer, speed: 3000 };
  const pilot = Pilots.find((v) => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
