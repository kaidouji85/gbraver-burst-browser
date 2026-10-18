import { getStateAfterBurst } from "./get-state-after-burst";
import { getStateAfterPilotSkill } from "./get-state-after-pilot-skill";
import { SimpleRoutineData } from "./simple-npc";

/**
 * プレイヤーの各種予想を取得する
 * @param data ルーチンに渡されるデータ
 * @returns プレイヤーの各種予想
 */
export function getExpectedPlayer(data: SimpleRoutineData) {
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
  return { expectedPlayer, expectedPlayerBattery };
}
