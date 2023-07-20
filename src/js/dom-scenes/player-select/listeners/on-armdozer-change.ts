import { ArmDozerId } from "gbraver-burst-core";

import { PlayerSelectProps } from "../props"


/**
 * アームドーザを変更した時の処理
 * @param props シーンプロパティ
 * @param armdozerId 変更したアームドーザID
 */
export function onArmdozerChange(
  props: Readonly<PlayerSelectProps>,
  armdozerId: ArmDozerId
): void {
  props.armdozerBustShot.switch(armdozerId);
}