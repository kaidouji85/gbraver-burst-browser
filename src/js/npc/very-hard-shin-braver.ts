import {
  ArmdozerIds,
  Armdozers,
  burst,
  Command,
  invokeBurst,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { getMinimumBeatDownBattery } from "./get-minimum-beat-down-battery";
import { getMinimumGuardBattery } from "./get-minimum-guard-battery";
import { getMinimumSurvivableBattery } from "./get-minimum-survivable-battery";
import { getOptimalDefenseBattery } from "./get-optimal-defense-battery";
import { NPC } from "./npc";
import { SimpleRoutine, SimpleRoutineData } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0,
};

/**
 * 攻撃ルーチンの条件判断オブジェクトを取得する
 * @param data ルーチンに渡されるデータ
 * @returns 攻撃ルーチンの条件判断オブジェクト
 */
const getAttackRoutineConditions = (data: SimpleRoutineData) => {
  const playerStatusIfBurst = data.player.armdozer.enableBurst
    ? invokeBurst({
        burst: data.player.armdozer.burst,
        invoker: data.player,
        other: data.enemy,
      }).invoker
    : data.enemy;
  return {
    burst: data.commands.find((v) => v.type === "BURST_COMMAND"),
    isBuffedPower: data.enemy.armdozer.effects.some(
      (e) => e.type === "CorrectPower",
    ),
    minimumBeatDownBatteryAfterPlayerBurst: getMinimumBeatDownBattery(
      data.enemy,
      playerStatusIfBurst,
      playerStatusIfBurst.armdozer.battery,
    ),
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
  };
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const {
    burst,
    minimumBeatDownBatteryAfterPlayerBurst,
    minimumBeatDownBattery,
    minimumGuardBattery,
  } = getAttackRoutineConditions(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (burst) {
    const battery = data.enemy.armdozer.battery;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (minimumBeatDownBatteryAfterPlayerBurst.isExist) {
    const battery = minimumBeatDownBatteryAfterPlayerBurst.value;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
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
 * 防御ルーチンの条件判断オブジェクトを取得する
 * @param data ルーチンに渡されるデータ
 * @returns 防御ルーチンの条件判断オブジェクト
 */
const getDefenseRoutineConditions = (data: SimpleRoutineData) => ({
  burst: data.commands.find((v) => v.type === "BURST_COMMAND"),
  pilot: data.commands.find((v) => v.type === "PILOT_SKILL_COMMAND"),
  optimalDefenseBattery: getOptimalDefenseBattery(data.enemy),
  minimumSurviveBattery: getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  hasTurnStartBatteryCorrect: data.enemy.armdozer.effects.some(
    (e) => e.type === "TurnStartBatteryCorrect",
  ),
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const {
    burst,
    pilot,
    hasTurnStartBatteryCorrect,
    optimalDefenseBattery,
    minimumSurviveBattery,
  } = getDefenseRoutineConditions(data);
  let selectedCommand: Command = {
    type: "BATTERY_COMMAND",
    battery: data.enemy.armdozer.battery,
  };

  if (burst && data.enemy.armdozer.battery <= 0) {
    selectedCommand = burst;
  } else if (pilot) {
    selectedCommand = pilot;
  } else if (hasTurnStartBatteryCorrect) {
    const battery = data.enemy.armdozer.battery;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (optimalDefenseBattery.isExist && minimumSurviveBattery.isExist) {
    const battery = Math.max(
      optimalDefenseBattery.value,
      minimumSurviveBattery.value,
    );
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (minimumSurviveBattery.isExist) {
    const battery = minimumSurviveBattery.value;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  }

  return selectedCommand;
};

/**
 * ベリーハードコース シンブレイバー NPC
 *
 * @returns NPC
 */
export function veryHardShinBraver(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
