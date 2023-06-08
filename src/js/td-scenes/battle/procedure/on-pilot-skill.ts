import { PilotSkillCommand } from "gbraver-burst-core";

import type { DoPilotSkill } from "../actions/do-pilot-skill";
import { animationPlayer } from "../animation-player";
import type { BattleSceneProps } from "../battle-scene-props";
import { doPilotSkillEventIfNeeded } from "./do-pilot-skill-event-if-needed";
import { progressGame } from "./progress-game";
import { decisionByPilotButton } from "../animation/decision-by-pilot-button";

/**
 * パイロットスキル発動時の処理
 *
 * @param props 戦闘シーンプロパティ
 * @param action パイロットスキル発動アクション
 * @return 処理が完了したら発火するPromise
 */
export function onPilotSkill(
  props: Readonly<BattleSceneProps>,
  action: DoPilotSkill
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
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

    await animationPlayer(props).play(
      decisionByPilotButton(props.view)
    );
    await progressGame(props, pilotSkillCommand);
  });
}
