import { PilotId } from "gbraver-burst-core";

import { PlayerSelectProps } from "../props";

/**
 * パイロットを決定した時の処理
 * @param props シーンプロパティ
 * @param pilotId 決定したパイロットID
 */
export function onPilotDecided(
  props: PlayerSelectProps,
  pilotId: PilotId
): void {
  props.pilotId = pilotId;
  props.playerDecide.next({
    armdozerId: props.armdozerId,
    pilotId: props.pilotId,
  });
}