import { PilotId, PilotIds } from "gbraver-burst-core";

/**  ルート要素のクラス名 */
const ROOT_CLASS_NAME = "pilot-bust-shot";

/** パイロットIDに対応したバストショットのクラス名 */
const PilotBustShotClassNames: Record<PilotId, string> = {
  [PilotIds.SHINYA]: `${ROOT_CLASS_NAME}__shinya`,
  [PilotIds.TSUBASA]: `${ROOT_CLASS_NAME}__tsubasa`,
  [PilotIds.GAI]: `${ROOT_CLASS_NAME}__gai`,
  [PilotIds.RAITO]: `${ROOT_CLASS_NAME}__raito`,
  [PilotIds.YUUYA]: `${ROOT_CLASS_NAME}__yuuya`,
};

/**
 * パイロットIDに対応したバストショットのクラス名を取得する
 * @param pilotId パイロットID
 * @returns バストショットのclass属性
 */
export const getPilotBustShotClassName = (pilotId: PilotId): string =>
  PilotBustShotClassNames[pilotId] ?? PilotBustShotClassNames[PilotIds.SHINYA];
