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
  battery1: findBatteryCommand(1, data.commands),
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
  const { player, enemy } = data;
  const {
    battery1,
    burst,
    pilot,
    minimumBeatDownBattery,
    minimumGuardBattery,
  } = getAttackRoutineCondition(data);

  let selectedCommand: Command = ZERO_BATTERY;
  if (pilot) {
    selectedCommand = pilot;
  } else if (player.armdozer.battery <= 4 && burst) {
    selectedCommand = burst;
  } else if (minimumBeatDownBattery.isExist) {
    selectedCommand = {
      type: "BATTERY_COMMAND",
      battery: minimumBeatDownBattery.value,
    };
  } else if (burst && battery1) {
    selectedCommand = battery1;
  } else if (
    minimumGuardBattery.isExist &&
    0 < enemy.armdozer.battery - minimumGuardBattery.value
  ) {
    selectedCommand = {
      type: "BATTERY_COMMAND",
      battery: minimumGuardBattery.value,
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
  battery5: findBatteryCommand(5, data.commands),
  fullBattery: findBatteryCommand(data.enemy.armdozer.battery, data.commands),
  burst: findBurstCommand(data.commands),
  minimumSurvivableBattery: getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const { enemy } = data;
  const { battery1, battery5, fullBattery, burst, minimumSurvivableBattery } =
    getDefenseRoutineCondition(data);

  let selectedCommand: Command = battery1 ?? ZERO_BATTERY;
  if (enemy.armdozer.battery === 5 && burst && battery5) {
    selectedCommand = battery5;
  } else if (burst && fullBattery) {
    selectedCommand = fullBattery;
  } else if (minimumSurvivableBattery.isExist) {
    selectedCommand = {
      type: "BATTERY_COMMAND",
      battery: minimumSurvivableBattery.value,
    };
  } else if (!minimumSurvivableBattery.isExist && burst) {
    selectedCommand = burst;
  } else if (fullBattery) {
    selectedCommand = fullBattery;
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
