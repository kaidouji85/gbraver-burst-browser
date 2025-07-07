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
import { getMinimumBeatDownBattery } from "./get-minimum-beat-down-battery";
import { getMinimumGuardBattery } from "./get-minimum-guard-battery";
import { getMinimumSurvivableBattery } from "./get-minimum-survivable-battery";
import { getOptimalDefenseBattery } from "./get-optimal-defense-battery";
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
  burst: findBurstCommand(data.commands),
  pilot: findPilotSkillCommand(data.commands),
  minimumBeatDownBattery: getMinimumBeatDownBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  minimumGuardBattery: getMinimumGuardBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
});

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const { pilot, burst, minimumBeatDownBattery, minimumGuardBattery } =
    getAttackRoutineCondition(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (pilot) {
    selectedCommand = pilot;
  } else if (burst) {
    selectedCommand = burst;
  } else if (minimumBeatDownBattery.isExist) {
    const battery = minimumBeatDownBattery.value;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (
    minimumGuardBattery.isExist &&
    minimumGuardBattery.value < data.enemy.armdozer.battery
  ) {
    const battery = minimumGuardBattery.value;
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
  battery1: findBatteryCommand(1, data.commands),
  battery5: findBatteryCommand(5, data.commands),
  optimalDefenseBattery: getOptimalDefenseBattery(data.enemy),
  minimumSurvivableBattery: getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  burst: findBurstCommand(data.commands),
  pilot: findPilotSkillCommand(data.commands),
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const {
    burst,
    pilot,
    battery1,
    battery5,
    minimumSurvivableBattery,
    optimalDefenseBattery,
  } = getDefenseRoutineCondition(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (burst && data.enemy.armdozer.battery <= 0) {
    selectedCommand = burst;
  } else if (burst && pilot && battery5) {
    selectedCommand = battery5;
  } else if (
    optimalDefenseBattery.isExist &&
    minimumSurvivableBattery.isExist
  ) {
    const battery = Math.max(
      optimalDefenseBattery.value,
      minimumSurvivableBattery.value,
    );
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (minimumSurvivableBattery.isExist) {
    const battery = minimumSurvivableBattery.value;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (!minimumSurvivableBattery.isExist && burst) {
    selectedCommand = burst;
  } else if (optimalDefenseBattery.isExist) {
    const battery = optimalDefenseBattery.value;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (battery1) {
    selectedCommand = battery1;
  }

  return selectedCommand;
};

/**
 * ベリーハードコース グランドーザ NPC
 * @returns NPC
 */
export function veryHardGranDozer(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.GRAN_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
