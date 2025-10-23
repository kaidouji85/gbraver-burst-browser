import {
  Armdozer,
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
import { getOptimalDefenseBattery } from "./get-optimal-defense-battery";
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
  const shouldFullBatteryAttack = enemy.armdozer.enableBurst;
  const battery = shouldFullBatteryAttack
    ? enemy.armdozer.battery
    : enemy.armdozer.battery - 1;
  return { type: "BATTERY_COMMAND", battery: Math.max(battery, 0) };
};

/**
 * 防御ルーチンの条件オブジェクトを生成する
 * @param data ルーチンに渡すデータ
 * @returns 防御ルーチンの条件オブジェクト
 */
const getDefenseRoutineCondition = (data: SimpleRoutineData) => ({
  battery1: findBatteryCommand(1, data.commands),
  burst: findBurstCommand(data.commands),
  pilot: findPilotSkillCommand(data.commands),
  minimumSurvivalBattery: getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  optimalDefenseBattery: getOptimalDefenseBattery(data.enemy),
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const { enemy } = data;
  const {
    burst,
    pilot,
    battery1,
    minimumSurvivalBattery,
    optimalDefenseBattery,
  } = getDefenseRoutineCondition(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (minimumSurvivalBattery.isExist) {
    const battery = optimalDefenseBattery.isExist
      ? Math.max(minimumSurvivalBattery.value, optimalDefenseBattery.value)
      : minimumSurvivalBattery.value;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (pilot && 0 < enemy.armdozer.battery) {
    selectedCommand = pilot;
  } else if (burst) {
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
  const armdozer: Armdozer = {
    ...originArmdozer,
    burst: { type: "EffectClear", recoverBattery: 1 },
  };
  const pilot = Pilots.find((v) => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
