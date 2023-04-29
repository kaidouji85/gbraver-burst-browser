import * as R from "ramda";
import { merge, Observable } from "rxjs";

import { domUuid } from "../../uuid/dom-uuid";
import { BatteryButton } from "./battery-button";
import { BurstButton } from "./burst-button";
import { ROOT } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";
import { PilotButton } from "./pilot-button";

/** バッテリーボタン最大個数 */
const MAX_BATTERY_BUTTON = 9;

/** ミニコントローラープロパティ */
export type MiniControllerProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** 全バッテリーボタン */
  batteryButtons: BatteryButton[];
  /** バーストボタン */
  burstButton: BurstButton;
  /** パイロットボタン */
  pilotButton: PilotButton;
  /** バッテリーボタン押下ストリーム、numberはバッテリー値 */
  batteryPush: Observable<number>;
};

/**
 * ミニコントローラープロパティを生成する
 * @return 生成結果
 */
export function createMiniControllerProps(): MiniControllerProps {
  const root = document.createElement("div");
  root.className = ROOT;
  const ids = { batteries: domUuid(), burst: domUuid(), pilot: domUuid() };
  root.innerHTML = rootInnerHTML(ids);
  const elements = extractElements(root, ids);
  const batteryButtons = R.times(R.identity, MAX_BATTERY_BUTTON).map(
    (battery) => new BatteryButton(battery)
  );
  batteryButtons.forEach((batteryButton) => {
    elements.batteries.appendChild(batteryButton.getRootHTMLElement());
  });
  const batteryPush = merge(
    ...batteryButtons.map((batteryButton) => batteryButton.pushNotifier())
  );
  const burst = new BurstButton();
  root.appendChild(burst.getRootHTMLElement());
  const pilot = new PilotButton();
  root.appendChild(pilot.getRootHTMLElement());
  return {
    ...elements,
    root,
    batteryButtons,
    batteryPush,
    burstButton: burst,
    pilotButton: pilot,
  };
}
