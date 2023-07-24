import { ArmDozerId, PilotIds } from "gbraver-burst-core";

import { getDedicatedPilot } from "../dedicated-pilot";
import { PlayerSelectProps } from "../props";

/**
 * アームドーザを決定した時の処理
 * @param props シーンプロパティ
 * @param armdozerId 決定したアームドーザID
 */
export function onArmdozerDecided(
  props: PlayerSelectProps,
  armdozerId: ArmDozerId,
): void {
  props.armdozerId = armdozerId;
  const dedicatedPilotId = getDedicatedPilot(props.armdozerId);
  props.pilotId = props.pilotIds.includes(dedicatedPilotId)
    ? dedicatedPilotId
    : PilotIds.SHINYA;
  props.pilotBustShot.switch(props.pilotId);
  props.pilotSelector.show(props.pilotId);
  props.armdozerSelector.hidden();
}
