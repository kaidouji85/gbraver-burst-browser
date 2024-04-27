import { PilotSkillCommand } from "gbraver-burst-core";

import { decisionByMiniController } from "../animation/decision-by-mini-controller";
import { decisionByPilotButton } from "../animation/decision-by-pilot-button";
import { BattleSceneProps } from "../props";
import { doPilotSkillEventIfNeeded } from "./do-pilot-skill-event-if-needed";
import { progressGame } from "./progress-game";

/**
 * ミニコントローラーでパイロットボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
export function onPilotSkillByMiniController(
  props: Readonly<BattleSceneProps>,
): void {
  props.exclusive.execute(async () => {
    const pilotSkillCommand: PilotSkillCommand = {
      type: "PILOT_SKILL_COMMAND",
    };
    const { isCommandCanceled } = await doPilotSkillEventIfNeeded(
      props,
      pilotSkillCommand,
    );
    if (isCommandCanceled) {
      return;
    }

    // display: noneでもミニコントローラのaccesskeyは有効なので、
    // コントローラーが「おおきいボタン」の場合でも、本関数は呼ばれうる
    const decisionAnimation =
      props.controllerType === "BigButton"
        ? decisionByPilotButton(props.view)
        : decisionByMiniController(props.view);
    await props.animatePlayer.play(decisionAnimation);
    await progressGame(props, pilotSkillCommand);
  });
}
