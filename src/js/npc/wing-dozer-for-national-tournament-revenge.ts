import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import { getMinimumBatteryToHitOrCritical } from "./get-minimum-battery-to-hit-or-critical";
import { getMinimumBeatDownBattery } from "./get-minimum-beat-down-battery";
import { getMinimumSurvivableBattery } from "./get-minimum-survivable-battery";
import { NPC } from "./npc";
import { SimpleRoutine } from "./simple-npc";
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
  const battery5 = data.commands.find(
    (command) => command.type === "BATTERY_COMMAND" && command.battery === 5,
  );
  const burst = data.commands.find(
    (command) => command.type === "BURST_COMMAND",
  );
  const pilot = data.commands.find(
    (command) => command.type === "PILOT_SKILL_COMMAND",
  );
  const minimumBeatDownBattery = getMinimumBeatDownBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  );
  const minimumBatteryToHitOrCritical = getMinimumBatteryToHitOrCritical(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  );
  const hasContinuousActivePlayer = data.enemy.armdozer.effects.some(
    (effect) => effect.type === "ContinuousActivePlayer",
  );

  if (pilot) {
    return pilot;
  }

  if (battery5 && burst) {
    return battery5;
  }

  if (hasContinuousActivePlayer) {
    return ZERO_BATTERY;
  }

  if (minimumBeatDownBattery.isExist) {
    return {
      type: "BATTERY_COMMAND",
      battery: minimumBeatDownBattery.value,
    };
  }

  if (minimumBatteryToHitOrCritical.isExist) {
    return {
      type: "BATTERY_COMMAND",
      battery: minimumBatteryToHitOrCritical.value,
    };
  }

  return ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const battery1 = data.commands.find(
    (command) => command.type === "BATTERY_COMMAND" && command.battery === 1,
  );
  const burst = data.commands.find(
    (command) => command.type === "BURST_COMMAND",
  );
  const minimumSurvivableBattery = getMinimumSurvivableBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  );

  if (burst) {
    return burst;
  }

  if (minimumSurvivableBattery.isExist) {
    return {
      type: "BATTERY_COMMAND",
      battery: minimumSurvivableBattery.value,
    };
  }

  return battery1 ?? ZERO_BATTERY;
};

/**
 * サイドエピソード「全国大会のリベンジ」 ウィングドーザ NPC
 * @return NPC
 */
export function wingDozerNPCForNationalTournamentRevenge(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.WING_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
