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
 * バッテリー1を出すルーチン
 */
const oneBatteryRoutine: SimpleRoutine = (data) => {
  const battery1 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  return battery1 ?? ZERO_BATTERY;
};

/**
 * バッテリー1をひたすら出す、ネオランドーザNPC
 * @returns NPC
 */
export function oneBatteryNeoLandozerNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.NEO_LANDOZER) ?? Armdozers[0];
  const tekitou = {  ...armdozer, maxHp: 100}; // TODO 開発が終わったら戻す
  const pilot = Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(tekitou, pilot, oneBatteryRoutine, oneBatteryRoutine);
}

/**
 * バッテリー1をひたすら出す、シンブレイバーNPC
 * @returns NPC
 */
export function oneBatteryShinBraverNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, oneBatteryRoutine, oneBatteryRoutine);
}

/**
 * バッテリー1をひたすら出す、ジェネシスブレイバーNPC
 * @returns NPC
 */
export function oneBatteryGenesisBraverNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.GENESIS_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, oneBatteryRoutine, oneBatteryRoutine);
}
