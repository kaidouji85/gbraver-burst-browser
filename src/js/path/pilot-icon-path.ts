import { PilotId, PilotIds } from "gbraver-burst-core";

import { PathIds } from "../resource/path/ids";
import { PathId } from "../resource/path/resource";

/** パイロットIDと対応するアイコンのパスIDのマッピング */
const PilotIconPathIds: Record<PilotId, PathId> = {
  [PilotIds.SHINYA]: PathIds.SHINYA_ICON,
  [PilotIds.TSUBASA]: PathIds.TSUBASA_ICON,
  [PilotIds.GAI]: PathIds.GAI_ICON,
  [PilotIds.RAITO]: PathIds.RAITO_ICON,
  [PilotIds.YUUYA]: PathIds.YUUYA_ICON,
};

/**
 * パイロットIDに対応するアイコンのパスIDを返す
 * @param pilotId パイロットID
 * @return パスID
 */
export const getPilotIconPathId = (pilotId: PilotId): PathId =>
  PilotIconPathIds[pilotId] ?? PilotIds.SHINYA;
