import { ArmdozerId } from "gbraver-burst-core";

import { PlayerSelectProps } from "../props";

/**
 * アームドーザを変更した時の処理
 * @param props シーンプロパティ
 * @param armdozerId 変更したアームドーザID
 */
export function onArmdozerChange(
  props: PlayerSelectProps,
  armdozerId: ArmdozerId,
): void {
  props.armdozerId = armdozerId;
  props.armdozerBustShot.switch(armdozerId);
}
