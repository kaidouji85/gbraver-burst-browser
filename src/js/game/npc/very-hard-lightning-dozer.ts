import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { canBeatDown } from "./can-beat-down";
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
const getAttackRoutineConditions = (data: SimpleRoutineData) => ({
  pilot: data.commands.find((v) => v.type === "PILOT_SKILL_COMMAND"),
  isBuffedPower: data.enemy.armdozer.effects.some(
    (e) => e.type === "CorrectPower",
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
});

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const { pilot, isBuffedPower, minimumBeatDownBattery, minimumGuardBattery } =
    getAttackRoutineConditions(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (data.enemy.armdozer.battery === 5 && pilot) {
    selectedCommand = pilot;
  } else if (data.enemy.armdozer.enableBurst && isBuffedPower) {
    const battery = data.enemy.armdozer.battery;
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
  battery1: data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  ),
  isDefeatedWithBattery1: canBeatDown(
    data.player,
    data.player.armdozer.battery,
    data.enemy,
    1,
  ),
  optimalDefenseBattery: getOptimalDefenseBattery(data.enemy),
  minimumSurviveBattery: getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  ),
  allBattery: data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  ),
  hasReflect: data.enemy.armdozer.effects.some((e) => e.type === "TryReflect"),
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const {
    burst,
    hasReflect,
    battery1,
    isDefeatedWithBattery1,
    optimalDefenseBattery,
    minimumSurviveBattery,
    allBattery,
  } = getDefenseRoutineConditions(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (burst) {
    selectedCommand = burst;
  } else if (hasReflect && !isDefeatedWithBattery1 && battery1) {
    selectedCommand = battery1;
  } else if (optimalDefenseBattery.isExist && minimumSurviveBattery.isExist) {
    const battery = Math.max(
      optimalDefenseBattery.value,
      minimumSurviveBattery.value,
    );
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (minimumSurviveBattery.isExist) {
    const battery = minimumSurviveBattery.value;
    selectedCommand = { type: "BATTERY_COMMAND", battery };
  } else if (allBattery) {
    selectedCommand = allBattery;
  }

  return selectedCommand;
};

/**
 * ベリーハードコース ライトニングドーザ NPC
 *
 * @returns NPC
 */
export function veryHardLightningDozer(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.LIGHTNING_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
