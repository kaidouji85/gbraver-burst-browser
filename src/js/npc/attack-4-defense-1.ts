import { ArmDozerIds, ArmDozers, PilotIds, Pilots } from "gbraver-burst-core";
import type { NPC } from "./npc";
import type { SimpleRoutine } from "./simple-npc";
import { SimpleNPC } from "./simple-npc";

/** 0バッテリー */
const ZERO_BATTERY = {
  type: "BATTERY_COMMAND",
  battery: 0
};

/**
 * @override
 * 攻撃ルーチン
 */
const attackRoutine: SimpleRoutine = ({
  commands,
  enemy
}) => {
  const battery4 = commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === 4);

  if (5 <= enemy.armdozer.battery && battery4) {
    return battery4;
  }

  return ZERO_BATTERY;
};

/**
 * @override
 * 防御ルーチン
 */
const defenseRoutine: SimpleRoutine = data => {
  const battery1 = data.commands.find(v => v.type === "BATTERY_COMMAND" && v.battery === 1);
  return battery1 ?? ZERO_BATTERY;
};

/**
 * 4攻撃、1防御、ライトニングドーザNPC
 *
 * @return NPC
 */
export function attack4Defense1LightningDozerNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIds.LIGHTNING_DOZER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.RAITO) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}

/**
 * 4攻撃、1防御、シンブレイバーNPC
 *
 * @return NPC
 */
export function attack4Defense1ShinBraverNPC(): NPC {
  const armdozer = ArmDozers.find(v => v.id === ArmDozerIds.SHIN_BRAVER) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === PilotIds.SHINYA) ?? Pilots[0];
  return new SimpleNPC(armdozer, pilot, attackRoutine, defenseRoutine);
}