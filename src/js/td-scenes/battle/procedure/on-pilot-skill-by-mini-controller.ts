import { PilotSkillCommand } from "gbraver-burst-core";

import { decisionByMiniController } from "../animation/decision-by-mini-controller";
import { BattleSceneProps } from "../battle-scene-props";
import { doPilotSkillEventIfNeeded } from "./do-pilot-skill-event-if-needed";
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
    const { isCommandCanceled } = await doPilotSkillEventIfNeeded(
      props,
      pilotSkillCommand
    );
    if (isCommandCanceled) {
      return;
    }

    await decisionByMiniController(props.view).play();
    await progressGame(props, pilotSkillCommand);
  });
}
