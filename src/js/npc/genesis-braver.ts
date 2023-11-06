import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { canBeatDown } from "./can-beat-down";
import { getMinimumBatteryToHitOrCritical } from "./get-minimum-battery-to-hit-or-critical";
import { getMinimumBeatDownBattery } from "./get-minimum-beat-down-battery";
import { getMinimumSurvivableBattery } from "./get-minimum-survivable-battery";
import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY: Command = {
  type: "BATTERY_COMMAND",
  battery: 0,
};

/** @override 攻撃ルーチン */
const attackRoutine: SimpleRoutine = (data) => {
  const battery4 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 4,
  );
  if (data.enemy.armdozer.maxBattery === 4 && battery4) {
    return battery4;
  }

  const minimumBeatDownBattery = getMinimumBeatDownBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  );
  if (minimumBeatDownBattery !== null) {
    return { type: "BATTERY_COMMAND", battery: minimumBeatDownBattery };
  }

  const minimumBatteryToHitOrCritical = getMinimumBatteryToHitOrCritical(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  );
  if (minimumBatteryToHitOrCritical !== null) {
    return { type: "BATTERY_COMMAND", battery: minimumBatteryToHitOrCritical };
  }

  return ZERO_BATTERY;
};

/** @override 防御ルーチン */
const defenseRoutine: SimpleRoutine = (data) => {
  const burst = data.commands.find((v) => v.type === "BURST_COMMAND");
  const pilot = data.commands.find((v) => v.type === "PILOT_SKILL_COMMAND");
  const battery3 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 3,
  );
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );

  if (
    data.enemy.armdozer.battery === data.enemy.armdozer.maxBattery &&
    battery3 &&
    !canBeatDown(data.player, data.player.armdozer.battery, data.enemy, 3)
  ) {
    return battery3;
  }

  const minimumSurvivableBattery = getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  );
  if (minimumSurvivableBattery !== null) {
    return { type: "BATTERY_COMMAND", battery: minimumSurvivableBattery };
  }

  if (burst && data.enemy.armdozer.battery <= 0) {
    return burst;
  }

  if (pilot && data.enemy.armdozer.battery <= 0) {
    return pilot;
  }

  return battery1 ?? ZERO_BATTERY;
};

/**
 * ジェネシスブレイバーNPC
 * @return NPC
 */
export function genesisBraverNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.GENESIS_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.YUUYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
