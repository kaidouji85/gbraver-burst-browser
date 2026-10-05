import {
  ArmdozerIds,
  Armdozers,
  Command,
  PilotIds,
  Pilots,
} from "gbraver-burst-core";

import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
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
  const battery3 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 3,
  );
  return battery3 ?? ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = (data) => {
  const battery2 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 2,
  );
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  return battery2 ?? battery1 ?? ZERO_BATTERY;
};

/**
 * 3攻撃、2防御、ライトニングドーザNPC
 * @returns NPC
 */
export function attack3Defense2LightningDozerNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.LIGHTNING_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}

/**
 * 3攻撃、2防御、シンブレイバーNPC
 * @returns NPC
 */
export function attack3Defense2ShinBraverNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}

/**
 * 3攻撃、2防御、ジェネシスブレイバーNPC
 * @returns NPC
 */
export function attack3Defense2GenesisBraverNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.GENESIS_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
