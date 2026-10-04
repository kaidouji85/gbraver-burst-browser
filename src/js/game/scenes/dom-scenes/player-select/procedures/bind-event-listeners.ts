import { Unsubscribable } from "rxjs";

import { PlayerSelectProps } from "../props";
import { onArmdozerChange } from "./on-armdozer-change";
import { onArmdozerDecided } from "./on-armdozer-decided";
import { onArmdozerSelectorPrev } from "./on-armdozer-selector-prev";
import { onPilotChange } from "./on-pilot-change";
import { onPilotDecided } from "./on-pilot-decided";
import { onPilotSelectorPrev } from "./on-pilot-selector-prev";

/**
 * シーンにイベントリスナをバインドする
 * @param props シーンプロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<PlayerSelectProps>,
): Unsubscribable[] {
  return [
    props.armdozerSelector.notifyChanges().subscribe((v) => {
      onArmdozerChange(props, v);
    }),
    props.armdozerSelector.notifyDecision().subscribe((v) => {
      onArmdozerDecided(props, v);
    }),
    props.armdozerSelector.notifyPrev().subscribe(() => {
      onArmdozerSelectorPrev(props);
    }),
    props.pilotSelector.notifyChanges().subscribe((v) => {
      onPilotChange(props, v);
    }),
    props.pilotSelector.notifyDecision().subscribe((v) => {
      onPilotDecided(props, v);
    }),
    props.pilotSelector.notifyPrev().subscribe(() => {
      onPilotSelectorPrev(props);
    }),
  ];
}
