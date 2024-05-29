import { Unsubscribable } from "rxjs";

import { DOMScene } from "../dom-scene";

/** DomSceneBinderプロパティ */
export type DOMSceneBinderProps = {
  /** DomSceneBinderルートHTML要素、本要素にシーンをバインドする */
  root: HTMLElement;
  /** 現在表示しているシーン、シーンが表示されていない場合はnullをセットする */
  scene: DOMScene | null | undefined;
  /** ゲームアクション通知ノアンサブスクライバ */
  unsubscribers: Unsubscribable[];
};

/**
 * DomSceneBinderプロパティを生成する
 * @returns 生成したプロパティ
 */
export function createDOMSceneBinderProps(): DOMSceneBinderProps {
  const root = document.createElement("div");
  const scene = null;
  return {
    root,
    scene,
    unsubscribers: [],
  };
}
