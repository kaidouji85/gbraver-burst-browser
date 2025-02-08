import { PilotSkillCommand } from "gbraver-burst-core";

import { DoPilotSkill } from "../../actions/do-pilot-skill";
import { decisionByPilotButton } from "../../animation/decision-by-pilot-button";
import { createAnimationPlay } from "../../play-animation";
import { BattleSceneProps } from "../../props";
import { doPilotSkillEventIfNeeded } from "../do-pilot-skill-event-if-needed";
import { progressGame } from "../progress-game";

/**
 * パイロットスキル発動時の処理
 *
 * @param props 戦闘シーンプロパティ
 * @param action パイロットスキル発動アクション
 * @returns 処理が完了したら発火するPromise
 */
export function onPilotSkill(
  props: Readonly<BattleSceneProps>,
  action: DoPilotSkill,
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    props.view.dom.hamburgerMenu.close();
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

    const playAnimation = createAnimationPlay(props);
    await playAnimation(decisionByPilotButton(props.view));
    await progressGame(props, pilotSkillCommand);
  });
}
