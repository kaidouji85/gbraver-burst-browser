import {
  ArmDozerIds,
  ArmDozers,
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
 * @return NPC
 */
export function oneBatteryNeoLandozerNPC(): NPC {
  const armdozer =
    ArmDozers.find((v) => v.id === ArmDozerIds.NEO_LANDOZER) ?? ArmDozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.GAI) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, oneBatteryRoutine, oneBatteryRoutine);
}

/**
 * バッテリー1をひたすら出す、シンブレイバーNPC
 * @return NPC
 */
export function oneBatteryShinBraverNPC(): NPC {
  const armdozer =
    ArmDozers.find((v) => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, oneBatteryRoutine, oneBatteryRoutine);
}

/**
 * バッテリー1をひたすら出す、ジェネシスブレイバーNPC
 * @return NPC
 */
export function oneBatteryGenesisBraverNPC(): NPC {
  const armdozer =
    ArmDozers.find((v) => v.id === ArmDozerIds.GENESIS_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, oneBatteryRoutine, oneBatteryRoutine);
}
