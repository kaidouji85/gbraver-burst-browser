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

/** @override 攻撃ルーチン */
const attackRoutine: SimpleRoutine = (data) => {
  const battery2 = data.commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 2,
  );
  return battery2 ?? ZERO_BATTERY;
};

/** @override 防御ルーチン */
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
 * バッテリーシステムチュートリアル用NPC
 *
 * @returns NPC
 */
export function batterySystemTutorialNPC(): NPC {
  const origin =
    Armdozers.find((v) => v.id === ArmdozerIds.WING_DOZER) ?? Armdozers[0];
  const armdozer = { ...origin, power: 600, speed: 1500 };
  const pilot = Pilots.find((v) => v.id === PilotIds.TSUBASA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
