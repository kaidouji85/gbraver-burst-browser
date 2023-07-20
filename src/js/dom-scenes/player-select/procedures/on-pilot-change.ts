import { PilotId } from "gbraver-burst-core";

import { PlayerSelectProps } from "../props";

/**
 * パイロットが変更された時の処理
 * @param props シーンプロパティ
 * @param pilotId 変更したパイロットID
 */
export function onPilotChange(
  props: PlayerSelectProps,
  pilotId: PilotId,
): void {
  props.pilotId = pilotId;
  props.pilotBustShot.switch(pilotId);
}
