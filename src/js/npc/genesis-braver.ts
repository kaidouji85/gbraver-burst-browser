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
import { NPC } from "./npc";
import { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";
import { getStateAfterPilotSkill } from "./get-state-after-pilot-skill";
import { getStateAfterBurst } from "./get-state-after-burst";

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
  const pilotSkill = data.commands.find(
    (v) => v.type === "PILOT_SKILL_COMMAND",
  );

  if (data.enemy.armdozer.maxBattery === 4 && battery4) {
    return battery4;
  }

  const minimumBeatDownBattery = getMinimumBeatDownBattery(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  );
  if (minimumBeatDownBattery.isExist) {
    return { type: "BATTERY_COMMAND", battery: minimumBeatDownBattery.value };
  }

  const { invoker: enemyAfterPilotSkill } = getStateAfterPilotSkill({
    invoker: data.enemy,
    other: data.player,
  });
  const canBeatDownAfterPilotSkill = canBeatDown(
    enemyAfterPilotSkill,
    enemyAfterPilotSkill.armdozer.battery,
    data.player,
    data.player.armdozer.battery,
  );
  if (
    canBeatDownAfterPilotSkill &&
    pilotSkill &&
    data.enemy.armdozer.battery < data.enemy.armdozer.maxBattery
  ) {
    return pilotSkill;
  }

  const minimumBatteryToHitOrCritical = getMinimumBatteryToHitOrCritical(
    data.enemy,
    data.player,
    data.player.armdozer.battery,
  );
  if (minimumBatteryToHitOrCritical.isExist) {
    return {
      type: "BATTERY_COMMAND",
      battery: minimumBatteryToHitOrCritical.value,
    };
  }

  return ZERO_BATTERY;
};

/** @override 防御ルーチン */
const defenseRoutine: SimpleRoutine = (data) => {
  const burst = data.commands.find((v) => v.type === "BURST_COMMAND");
  const pilotSkill = data.commands.find(
    (v) => v.type === "PILOT_SKILL_COMMAND",
  );
  const battery3 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 3,
  );
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  const { invoker: playerAfterBurst } = getStateAfterBurst({
    invoker: data.player,
    other: data.enemy,
  });
  const { invoker: playerAfterPilotSkill } = getStateAfterPilotSkill({
    invoker: data.player,
    other: data.enemy,
  });
  const expectedPlayer = (() => {
    if (data.playerCommand.type === "BURST_COMMAND") {
      return playerAfterBurst;
    } else if (data.playerCommand.type === "PILOT_SKILL_COMMAND") {
      return playerAfterPilotSkill;
    } else {
      return data.player;
    }
  })();
  const expectedPlayerBattery = (() => {
    if (data.playerCommand.type === "BATTERY_COMMAND") {
      return data.playerCommand.battery;
    } else {
      return expectedPlayer.armdozer.battery;
    }
  })();
  if (burst && data.enemy.armdozer.battery <= 0) {
    return burst;
  }

  if (
    data.enemy.armdozer.battery === data.enemy.armdozer.maxBattery &&
    battery3 &&
    !canBeatDown(expectedPlayer, expectedPlayerBattery, data.enemy, 3)
  ) {
    return battery3;
  }

  const minimumSurvivableBattery = getMinimumSurvivableBattery(
    data.enemy,
    expectedPlayer,
    expectedPlayerBattery,
  );
  if (minimumSurvivableBattery.isExist) {
    return { type: "BATTERY_COMMAND", battery: minimumSurvivableBattery.value };
  }

  const { invoker: enemyAfterPilotSkill } = getStateAfterPilotSkill({
    invoker: data.enemy,
    other: expectedPlayer,
  });
  const minimumSurvivableBatteryAfterPilotSkill = getMinimumSurvivableBattery(
    enemyAfterPilotSkill,
    expectedPlayer,
    expectedPlayerBattery,
  );
  if (minimumSurvivableBatteryAfterPilotSkill.isExist && pilotSkill) {
    return pilotSkill;
  }

  if (pilotSkill && data.enemy.armdozer.battery <= 0) {
    return pilotSkill;
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
