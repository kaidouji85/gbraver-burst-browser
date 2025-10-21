import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { canBeatDown } from "./can-beat-down";
import { findBatteryCommand } from "./find-battery-command";
import { findBurstCommand } from "./find-burst-command";
import { findPilotSkillCommand } from "./find-pilot-skill-command";
import { NPC } from "./npc";
import { SimpleRoutine, SimpleRoutineData } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0,
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = (data) => {
  return { type: "BATTERY_COMMAND", battery: data.enemy.armdozer.battery };
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
  isDeath: canBeatDown(
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
  const { battery1, burst, pilot, isDeath } = getDefenseRoutineCondition(data);

  let selectedCommand: Command = ZERO_BATTERY;
  if (burst) {
    selectedCommand = burst;
  } else if (isDeath && pilot && 0 < data.enemy.armdozer.battery) {
    selectedCommand = pilot;
  } else if (battery1) {
    selectedCommand = battery1;
  }

  return selectedCommand;
};

/**
 * ライトニングドーザ（エピソード「すれちがい」）
 *
 * @returns NPC
 */
export function lightningDozerNPCForMisunderstanding(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.LIGHTNING_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
