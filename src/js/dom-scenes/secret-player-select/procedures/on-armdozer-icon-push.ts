import { ArmdozerId } from "gbraver-burst-core";

import { SecretPlayerSelectProps } from "../props";

/**
 * アームドーザアイコンが押された際の処理
 * @param props プロパティ
 * @param armdozerId 選択されたアームドーザID
 */
export function onArmdozerIconPush(
  props: SecretPlayerSelectProps,
  armdozerId: ArmdozerId,
): void {
  const reselectionNumber = props.armdozerSelection.type === "ArmdozerSelectionComplete"
    ? props.armdozerSelection.reselectionNumber + 1
    : 0;
  props.armdozerSelection = {
    type: "ArmdozerSelectionComplete",
    armdozerId,
    reselectionNumber,
  };
}
