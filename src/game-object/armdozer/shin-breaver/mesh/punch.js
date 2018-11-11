// @flow

import type {Resources} from "../../../../resource";
import type {ArmdozerMesh} from "../../common/armdozer-mesh";
import {HorizontalAnimationMesh} from "../../common/horizontal-animation-mesh";
import {TEXTURE_IDS} from "../../../../resource/texture";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;

/** シンブレイバーパンチ */
export function shinBraverPunch(resources: Resources): ArmdozerMesh {
  const ret = new HorizontalAnimationMesh({
    id: TEXTURE_IDS.SHIN_BRAVER_PUNCH,
    maxAnimation: 16,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 150;
  return ret;
}
