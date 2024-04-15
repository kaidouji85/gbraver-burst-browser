import * as R from "ramda";
import { merge, Observable } from "rxjs";

import { Resources } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayer } from "../../se/se-player";
import { domUuid } from "../../uuid/dom-uuid";
import { BatteryButton } from "./battery-button";
import { BurstButton } from "./burst-button";
import { ROOT_INVISIBLE } from "./dom/class-name";
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
  /** ボタン押下サウンド */
  pushButtonSound: SoundResource;
  /** SE再生 */
  se: SEPlayer;
};

/** 生成パラメータ */
export type PropsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生 */
  se: SEPlayer;
};

/**
 * ミニコントローラープロパティを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createMiniControllerProps(
  params: PropsCreatorParams,
): MiniControllerProps {
  const { resources, se } = params;
  const root = document.createElement("div");
  root.className = ROOT_INVISIBLE;
  const ids = { batteries: domUuid(), burst: domUuid(), pilot: domUuid() };
  root.innerHTML = rootInnerHTML(ids);
  const elements = extractElements(root, ids);
  const batteryButtons = R.times(R.identity, MAX_BATTERY_BUTTON).map(
    (battery) => new BatteryButton(battery),
  );
  batteryButtons.forEach((batteryButton) => {
    elements.batteries.appendChild(batteryButton.getRootHTMLElement());
  });
  const batteryPush = merge(
    ...batteryButtons.map((batteryButton) => batteryButton.pushNotifier()),
  );
  const burst = new BurstButton();
  root.appendChild(burst.getRootHTMLElement());
  const pilot = new PilotButton();
  root.appendChild(pilot.getRootHTMLElement());
  const pushButtonSound =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  return {
    ...elements,
    root,
    batteryButtons,
    batteryPush,
    burstButton: burst,
    pilotButton: pilot,
    pushButtonSound,
    se,
  };
}
