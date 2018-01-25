// @flow

import type {BattleSceneState} from "../../index";
import type {Resources} from "../../../../resource/index";
import type {Stage} from '../../../../game-object/stage/stage';
import SchoolField from "../../../../game-object/stage/school";

export function createStage(props: {resources: Resources, state: BattleSceneState}): Stage {
  return new SchoolField(props.resources);
}