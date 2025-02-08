import { PilotSkillCommand } from "gbraver-burst-core";

import { DoPilotSkillByMiniController } from "../../actions/do-pilot-skill-by-mini-controller";
import { decisionByMiniController } from "../../animation/decision-by-mini-controller";
import { decisionByPilotButton } from "../../animation/decision-by-pilot-button";
import { createAnimationPlay } from "../../play-animation";
import { BattleSceneProps } from "../../props";
import { doPilotSkillEventIfNeeded } from "../do-pilot-skill-event-if-needed";
import { progressGame } from "../progress-game";

/**
 * ミニコントローラーでパイロットボタンが押された時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
export function onPilotSkillByMiniController(
  props: Readonly<BattleSceneProps>,
  action: Readonly<DoPilotSkillByMiniController>,
): void {
  props.exclusive.execute(async () => {
    const { event } = action;
    const pilotSkillCommand: PilotSkillCommand = {
      type: "PILOT_SKILL_COMMAND",
    };
    const { isCommandCanceled } = await doPilotSkillEventIfNeeded({
      props,
      pilot: pilotSkillCommand,
      event,
    });
    if (isCommandCanceled) {
      return;
    }

    // display: noneでもミニコントローラのaccesskeyは有効なので、
    // コントローラーが「おおきいボタン」の場合でも、本関数は呼ばれうる
    const decisionAnimation =
      props.controllerType === "BigButton"
        ? decisionByPilotButton(props.view)
        : decisionByMiniController(props.view);
    const playAnimation = createAnimationPlay(props);
    await playAnimation(decisionAnimation);
    await progressGame(props, pilotSkillCommand);
  });
}
