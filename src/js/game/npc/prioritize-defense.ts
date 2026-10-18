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
const attackRoutine: SimpleRoutine = ({ commands, enemy, player }) => {
  const battery1 = commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );

  if (battery1 && player.armdozer.battery < enemy.armdozer.battery) {
    return battery1;
  }

  return ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = ({ commands, enemy, player }) => {
  const oneGreaterThanPlayer = commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === player.armdozer.battery + 1,
  );

  if (oneGreaterThanPlayer) {
    return oneGreaterThanPlayer;
  }

  const sameSaPlayer = commands.find(
    (v) =>
      v.type === "BATTERY_COMMAND" && v.battery === player.armdozer.battery,
  );

  if (sameSaPlayer) {
    return sameSaPlayer;
  }

  const maxBattery = commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === enemy.armdozer.battery,
  );
  const battery1 = commands.find(
    (v) => v.type === "BATTERY_COMMAND" && v.battery === 1,
  );
  return maxBattery ?? battery1 ?? ZERO_BATTERY;
};

/**
 * 防御優先、ウィングドーザNPC
 *
 * @returns NPC
 */
export function prioritizeDefenseWingDozer(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.WING_DOZER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}

/**
 * 防御優先、シンブレイバーNPC
 *
 * @returns NPC
 */
export function prioritizeDefenseShinBraverNPC(): NPC {
  const armdozer =
    Armdozers.find((v) => v.id === ArmdozerIds.SHIN_BRAVER) ?? Armdozers[0];
  const pilot = Pilots.find((v) => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}
