import { ArmdozerId } from "gbraver-burst-core";

import { pop } from "../../../dom/pop";
import { ARMDOZER_SELECTION_COMPLETE } from "../dom/class-name";
import { SecretPlayerSelectProps } from "../props";
import { enableOKButtonIfNeeded } from "./enable-ok-button-if-needed";

/**
 * アームドーザアイコンが押された際の処理
 * @param props プロパティ
 * @param armdozerId 選択されたアームドーザID
 */
export function onArmdozerIconPush(
  props: SecretPlayerSelectProps,
  armdozerId: ArmdozerId,
): void {
  const selectionNumber =
    props.armdozerSelection.type === "ArmdozerSelectionComplete"
      ? props.armdozerSelection.selectionNumber + 1
      : 1;
  props.armdozerSelection = {
    type: "ArmdozerSelectionComplete",
    armdozerId,
    selectionNumber,
  };
  props.armdozerSelectionIndicator.className = ARMDOZER_SELECTION_COMPLETE;
  props.armdozerSelectionDetail.innerText = "選択完了"
  props.se.play(props.pushButtonSound);
  pop(props.armdozerSelectionIndicator, 1.2);
  enableOKButtonIfNeeded(props);
}
