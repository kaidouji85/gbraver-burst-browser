import { PilotId } from "gbraver-burst-core";

import {pop} from "../../../dom/pop";
import { PILOT_SELECTION_COMPLETE } from "../dom/class-name";
import { SecretPlayerSelectProps } from "../props";
import { getPilotSeelctionDetail } from "./get-pilot-selection-detail";

/**
 * パイロットアイコンが押された際の処理
 * @param props プロパティ
 * @param pilotId パイロットID
 */
export function onPilotIconPush(
  props: SecretPlayerSelectProps,
  pilotId: PilotId,
): void {
  const reselectionNumber =
    props.pilotSelection.type === "PilotSelectionComplete"
      ? props.pilotSelection.reselectionNumber + 1
      : 0;
  props.pilotSelection = {
    type: "PilotSelectionComplete",
    pilotId,
    reselectionNumber,
  };
  props.pilotSelectionIndicator.className = PILOT_SELECTION_COMPLETE;
  props.pilotSelectionDetail.innerText = getPilotSeelctionDetail(
    props.pilotSelection,
  );
  props.pushButtonSound.sound.play();
  pop(props.pilotSelectionIndicator, 1.2);
}
