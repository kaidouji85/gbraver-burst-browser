import {
  Armdozer,
  Armdozers,
  Command,
  Pilot,
  Pilots,
} from "gbraver-burst-core";

import type { NPC } from "../../src/js/npc/npc";

/** 空NPCのシンプルな実装 */
class SimpleEmptyNPC implements NPC {
  armdozer: Armdozer;
  pilot: Pilot;

  /**
   * コンストラクタ
   */
  constructor() {
    this.armdozer = Armdozers[0];
    this.pilot = Pilots[0];
  }

  /** @override */
  routine(): Command {
    return {
      type: "BATTERY_COMMAND",
      battery: 0,
    };
  }
}

/**
 * 空NPCを生成する
 * @returns 生成結果
 */
export function createEmptyNPC(): NPC {
  return new SimpleEmptyNPC();
}
