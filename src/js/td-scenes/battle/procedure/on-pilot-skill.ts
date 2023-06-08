import { PilotSkillCommand } from "gbraver-burst-core";

import { all } from "../../../animation/all";
import { delay } from "../../../animation/delay";
import type { DoPilotSkill } from "../actions/do-pilot-skill";
import { animationPlayer } from "../animation-player";
import type { BattleSceneProps } from "../battle-scene-props";
import { doPilotSkillEventIfNeeded } from "./do-pilot-skill-event-if-needed";
import { progressGame } from "./progress-game";

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
      all(
        props.view.hud.gameObjects.pilotButton.decide(),
        props.view.hud.gameObjects.burstButton.close(),
        props.view.hud.gameObjects.batterySelector.close(),
        props.view.hud.gameObjects.timeScaleButton.close()
      )
        .chain(delay(500))
        .chain(props.view.hud.gameObjects.pilotButton.close())
    );
    await progressGame(props, pilotSkillCommand);
  });
}
