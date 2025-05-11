import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { findBatteryCommand } from "./find-battery-command";
import { findBurstCommand } from "./find-burst-command";
import { findPilotSkillCommand } from "./find-pilot-skill-command";
import { getMinimumSurvivableBattery } from "./get-minimum-survivable-battery";
import { NPC } from "./npc";
import { SimpleNPC, SimpleRoutine, SimpleRoutineData } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = { type: "BATTERY_COMMAND", battery: 0 };

/**
 * 攻撃ルーチンの条件オブジェクトを生成する
 * @param data ルーチンに渡すデータ
 * @returns 攻撃ルーチンの条件オブジェクト
 */
const getAttackRoutineCondition = (data: SimpleRoutineData) => ({
  battery5: findBatteryCommand(5, data.commands),
  burst: findBurstCommand(data.commands),
  pilot: findPilotSkillCommand(data.commands),
});

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const { battery5, burst, pilot } = getAttackRoutineCondition(data);

  let selectedCommand: Command = ZERO_BATTERY;
  if (battery5 && pilot && burst) {
    selectedCommand = battery5;
  } else if (1 < data.enemy.armdozer.battery) {
    const battery = data.enemy.armdozer.battery - 1;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  }

  return selectedCommand;
};

/**
 * 防御ルーチンの条件オブジェクトを生成する
 * @param data ルーチンに渡すデータ
 * @returns 防御ルーチンの条件オブジェクト
 */
const getDefenseRoutineCondition = (data: SimpleRoutineData) => ({
  minimumSurviveBattery: getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  battery1: findBatteryCommand(1, data.commands),
  battery2: findBatteryCommand(2, data.commands),
  burst: findBurstCommand(data.commands),
  pilot: findPilotSkillCommand(data.commands),
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const { enemy } = data;
  const { battery1, minimumSurviveBattery, burst, pilot } =
    getDefenseRoutineCondition(data);

  let selectedCommand: Command = burst ??
    pilot ?? { type: "BATTERY_COMMAND", battery: enemy.armdozer.battery };
  if (burst && pilot && enemy.armdozer.battery === 5 && battery1) {
    selectedCommand = battery1;
  } else if (enemy.armdozer.battery === 0 && burst) {
    selectedCommand = burst;
  } else if (battery1 && !burst && pilot) {
    selectedCommand = pilot;
  } else if (minimumSurviveBattery.isExist) {
    const { value: battery } = minimumSurviveBattery;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  }

  return selectedCommand;
};

/**
 * サイドエピソード「超火力はガードで凌げ」 グランドーザ NPC
 * @returns NPC
 */
export function granDozerForSurviveSuperPowerWithGuardNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.GRAN_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
