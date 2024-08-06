import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
  totalCorrectPower,
} from "gbraver-burst-core";

import { findBatteryCommand } from "./find-battery-command";
import { findBurstCommand } from "./find-burst-command";
import { findPilotSkillCommand } from "./find-pilot-skill-command";
import { getMinimumBatteryToHitOrCritical } from "./get-minimum-battery-to-hit-or-critical";
import { getMinimumBeatDownBattery } from "./get-minimum-beat-down-battery";
import { getMinimumSurvivableBattery } from "./get-minimum-survivable-battery";
import { NPC } from "./npc";
import { SimpleNPC, SimpleRoutine, SimpleRoutineData } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0,
};

/**
 * 攻撃ルーチンの条件オブジェクトを生成する
 * @param data ルーチンに渡すデータ
 * @returns 攻撃ルーチンの条件オブジェクト
 */
const getAttackRoutineCondition = (data: SimpleRoutineData) => ({
  battery5: findBatteryCommand(5, data.commands),
  burst: findBurstCommand(data.commands),
  pilot: findPilotSkillCommand(data.commands),
  minimumBeatDownBattery: getMinimumBeatDownBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  minimumBatteryToHitOrCritical: getMinimumBatteryToHitOrCritical(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  hasCorrectPower: 0 < totalCorrectPower(data.enemy.armdozer.effects),
});

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const { player } = data;
  const {
    battery5,
    burst,
    pilot,
    minimumBeatDownBattery,
    minimumBatteryToHitOrCritical,
    hasCorrectPower,
  } = getAttackRoutineCondition(data);

  let selectedCommand: Command = ZERO_BATTERY;
  if (pilot) {
    selectedCommand = pilot;
  } else if (player.armdozer.battery <= 4 && burst) {
    selectedCommand = burst;
  } else if (player.armdozer.battery <= 4 && battery5 && hasCorrectPower) {
    selectedCommand = battery5;
  } else if (battery5 && burst) {
    selectedCommand = battery5;
  } else if (minimumBeatDownBattery.isExist) {
    selectedCommand = {
      type: "BATTERY_COMMAND",
      battery: minimumBeatDownBattery.value,
    };
  } else if (minimumBatteryToHitOrCritical.isExist) {
    selectedCommand = {
      type: "BATTERY_COMMAND",
      battery: minimumBatteryToHitOrCritical.value,
    };
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
  battery3: findBatteryCommand(3, data.commands),
  battery5: findBatteryCommand(5, data.commands),
  burst: findBurstCommand(data.commands),
  minimumSurvivableBattery: getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  isFullBattery: data.enemy.armdozer.battery === data.enemy.armdozer.maxBattery,
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const { battery1, battery5, burst, minimumSurvivableBattery, isFullBattery } =
    getDefenseRoutineCondition(data);

  let selectedCommand: Command = battery1 ?? ZERO_BATTERY;
  if (isFullBattery && burst && battery5) {
    selectedCommand = battery5;
  } else if (data.enemy.armdozer.battery === 0 && burst) {
    selectedCommand = burst;
  } else if (minimumSurvivableBattery.isExist) {
    selectedCommand = {
      type: "BATTERY_COMMAND",
      battery: minimumSurvivableBattery.value,
    };
  }

  return selectedCommand;
};

/**
 * サイドエピソード「落日の王子」 ネオランドーザ NPC
 * @returns NPC
 */
export function neoLandozerNPCForPrinceOfFallenSun(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.NEO_LANDOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
