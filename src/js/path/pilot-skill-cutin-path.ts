import { PilotId, PilotIds } from "gbraver-burst-core";

import { PathIds } from "../resource/path/ids";
import { PathId } from "../resource/path/resource";

/** パイロットIDと対応するスキルカットインのパスIDのマッピング */
const PilotSkillCutinPathIds: Record<PilotId, PathId> = {
  [PilotIds.SHINYA]: PathIds.SHINYA_SKILL_CUTIN,
  [PilotIds.TSUBASA]: PathIds.TSUBASA_SKILL_CUTIN,
  [PilotIds.GAI]: PathIds.GAI_SKILL_CUTIN,
  [PilotIds.RAITO]: PathIds.RAITO_SKILL_CUTIN,
  [PilotIds.YUUYA]: PathIds.YUUYA_SKILL_CUTIN,
};

/**
 * パイロットIDに対応するスキルカットインのパスIDを返す
 * @param pilotId パイロットID
 * @return パスID
 */
export const getPilotIconPathId = (pilotId: PilotId): PathId =>
  PilotSkillCutinPathIds[pilotId] ?? PathIds.SHINYA_SKILL_CUTIN;
