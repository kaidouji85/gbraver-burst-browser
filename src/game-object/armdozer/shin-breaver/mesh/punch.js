// @flow

import type {Resources} from "../../../../resource";
import {ANIMATED_TEXTURE_IDS} from "../../../../resource/animated-texture";
import type {ArmdozerMesh} from "../../common/armdozer-mesh";
import {HorizontalAnimationMesh} from "../../common/horizontal-animation-mesh";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;

/** シンブレイバーパンチ */
export function shinBraverPunch(resources: Resources): ArmdozerMesh {
  const ret = new HorizontalAnimationMesh({
    id: ANIMATED_TEXTURE_IDS.SHIN_BRAVER_PUNCH,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 150;
  return ret;
}
