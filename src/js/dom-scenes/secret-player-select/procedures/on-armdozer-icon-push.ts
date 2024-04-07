import { ArmdozerId } from "gbraver-burst-core";

import { SecretPlayerSelectProps } from "../props";
import { getArmdozerSeelctionDetail } from "./get-armdozer-seelction-detail";
import { ARMDOZER_SELECTION_COMPLETE } from "../dom/class-name";

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
}
