import { PilotSkillCommand } from "gbraver-burst-core";

import { decideMiniController } from "../animation/decide-mini-controller";
import { BattleSceneProps } from "../battle-scene-props";
import { doPilotSkillEventOrNot } from "./do-pilot-skill-event-or-not";
import { progressGame } from "./progress-game";

/**
 * ミニコントローラーでパイロットボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export function onPilotSkillByMiniController(
  props: Readonly<BattleSceneProps>
): void {
  props.exclusive.execute(async () => {
    const pilotSkillCommand: PilotSkillCommand = {
      type: "PILOT_SKILL_COMMAND",
    };
    const { isCommandCanceled } = await doPilotSkillEventOrNot(
      props,
      pilotSkillCommand
    );
    if (isCommandCanceled) {
      return;
    }

    await decideMiniController(props.view).play();
    await progressGame(props, pilotSkillCommand);
  });
}
