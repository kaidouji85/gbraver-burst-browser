import {
  ArmdozerIds,
  Armdozers,
  Command,
  correctPower,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { canBeatDown } from "./can-beat-down";
import type { NPC } from "./npc";
import type { SimpleRoutine, SimpleRoutineData } from "./simple-npc";
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
  hasCorrectPower: 0 < correctPower(data.enemy.armdozer.effects),
  pilot: data.commands.find((v) => v.type === "PILOT_SKILL_COMMAND"),
  allBattery: data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  ),
  allBatteryMinusOne: data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" &&
      v.battery === data.enemy.armdozer.battery - 1,
  ),
  canBeatDownWithAllBattery: canBeatDown(
    data.enemy,
    data.enemy.armdozer.battery,
    data.player,
    data.player.armdozer.battery,
  ),
});

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  const {
    hasCorrectPower,
    pilot,
    allBattery,
    allBatteryMinusOne,
    canBeatDownWithAllBattery,
  } = getAttackRoutineConditions(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (data.enemy.armdozer.battery === 5 && pilot) {
    selectedCommand = pilot;
  } else if (
    hasCorrectPower &&
    data.enemy.armdozer.battery === 5 &&
    allBattery
  ) {
    selectedCommand = allBattery;
  } else if (
    canBeatDownWithAllBattery &&
    !data.player.armdozer.enableBurst &&
    !data.player.pilot.enableSkill &&
    allBattery
  ) {
    selectedCommand = allBattery;
  } else if (allBatteryMinusOne) {
    selectedCommand = allBatteryMinusOne;
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
  allBattery: data.commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === data.enemy.armdozer.battery,
  ),
  isDefeatedWithBattery1: canBeatDown(
    data.player,
    data.player.armdozer.battery,
    data.enemy,
    1,
  ),
});

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const { burst, battery1, allBattery, isDefeatedWithBattery1 } =
    getDefenseRoutineConditions(data);
  let selectedCommand: Command = ZERO_BATTERY;

  if (burst) {
    selectedCommand = burst;
  } else if (isDefeatedWithBattery1 && allBattery) {
    selectedCommand = allBattery;
  } else if (battery1) {
    selectedCommand = battery1;
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
