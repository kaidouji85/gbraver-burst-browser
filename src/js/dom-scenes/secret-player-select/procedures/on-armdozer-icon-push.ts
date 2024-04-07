import { ArmdozerId } from "gbraver-burst-core";

import { pop } from "../../../dom/pop";
import { ARMDOZER_SELECTION_COMPLETE } from "../dom/class-name";
import { SecretPlayerSelectProps } from "../props";
import { getArmdozerSeelctionDetail } from "./get-armdozer-seelction-detail";

/**
 * アームドーザアイコンが押された際の処理
 * @param props プロパティ
 * @param armdozerId 選択されたアームドーザID
 */
export function onArmdozerIconPush(
  props: SecretPlayerSelectProps,
  armdozerId: ArmdozerId,
): void {
  const reselectionNumber =
    props.armdozerSelection.type === "ArmdozerSelectionComplete"
      ? props.armdozerSelection.reselectionNumber + 1
      : 0;
  props.armdozerSelection = {
    type: "ArmdozerSelectionComplete",
    armdozerId,
    reselectionNumber,
  };
  props.armdozerSelectionIndicator.className = ARMDOZER_SELECTION_COMPLETE;
  props.armdozerSelectionDetail.innerText = getArmdozerSeelctionDetail(
    props.armdozerSelection,
  );
  props.pushButtonSound.sound.play();
  pop(props.armdozerSelectionIndicator, 1.2);
}
