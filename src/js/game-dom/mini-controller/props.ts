import { Subject } from "rxjs";

import { domUuid } from "../../uuid/dom-uuid";
import { ROOT } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** ミニコントローラープロパティ */
export type MiniControllerProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** 全バッテリーボタン */
  batteryButtons: HTMLButtonElement[];
  /** バーストコマンド */
  burst: HTMLElement;
  /** パイロットコマンド */
  pilot: HTMLElement;
  /** バッテリーボタン押下ストリーム、numberはバッテリー値 */
  batteryPush: Subject<number>;
  /** バーストボタン押下ストリーム */
  burstPush: Subject<void>;
  /** パイロットボタン押下ストリーム */
  pilotPush: Subject<void>;
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
  const batteryButtons = [...elements.batteries.querySelectorAll("button")];
  return {
    ...elements,
    root,
    batteryButtons,
    batteryPush: new Subject(),
    burstPush: new Subject(),
    pilotPush: new Subject(),
  };
}
