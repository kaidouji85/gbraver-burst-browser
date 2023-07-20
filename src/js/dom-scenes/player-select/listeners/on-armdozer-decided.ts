import { ArmDozerId } from "gbraver-burst-core";

import { getDedicatedPilot } from "../dedicated-pilot";
import { PlayerSelectProps } from "../props";

/**
 * アームドーザを決定した時の処理
 * @param props シーンプロパティ
 * @param armdozerId 決定したアームドーザID
 */
export function onArmdozerDecided(
  props: PlayerSelectProps,
  armdozerId: ArmDozerId
): void {
  props.armdozerId = armdozerId;
  props.pilotId = getDedicatedPilot(props.armdozerId);
  props.pilotBustShot.switch(props.pilotId);
  props.pilotSelector.show(props.pilotId);
  props.armdozerSelector.hidden();
}