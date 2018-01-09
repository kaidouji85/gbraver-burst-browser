// @flow

import type {BattleSceneState} from "../../index";
import type {Resources} from "../../../../resource/resource-manager";
import type {Stage} from '../../../../game-object/stage/base';
import SchoolField from "../../../../game-object/stage/school";

export function createStage(props: {resources: Resources, state: BattleSceneState}): Stage {
  return new SchoolField(props.resources);
}