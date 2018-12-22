// @flow

import type {Resources} from "../../../../resource/index";
import type {Stage} from '../../../../game-object/stage/stage';
import SchoolField from "../../../../game-object/stage/school";
import {Observable} from "rxjs";

export function createStage(resources: Resources): Stage {
  return new SchoolField(resources);
}