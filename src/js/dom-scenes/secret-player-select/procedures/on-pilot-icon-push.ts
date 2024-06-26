import { PilotId } from "gbraver-burst-core";

import { pop } from "../../../dom/pop";
import { PILOT_SELECTION_COMPLETE } from "../dom/class-name";
import { SecretPlayerSelectProps } from "../props";
import { enableOKButtonIfNeeded } from "./enable-ok-button-if-needed";
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
  const selectionNumber =
    props.pilotSelection.type === "PilotSelectionComplete"
      ? props.pilotSelection.selectionNumber + 1
      : 1;
  props.pilotSelection = {
    type: "PilotSelectionComplete",
    pilotId,
    selectionNumber,
  };
  props.pilotSelectionIndicator.className = PILOT_SELECTION_COMPLETE;
  props.pilotSelectionDetail.innerText = getPilotSeelctionDetail(
    props.pilotSelection,
  );
  props.se.play(props.pushButtonSound);
  pop(props.pilotSelectionIndicator, 1.2);
  enableOKButtonIfNeeded(props);
}
