import { Subject, Unsubscribable } from "rxjs";

import type { DOMScene } from "../../dom-scenes/dom-scene";
import type { GameAction } from "../game-actions";

/** DomSceneBinderプロパティ */
export type DOMSceneBinderProps = {
  /** DomSceneBinderルートHTML要素、本要素にシーンをバインドする */
  root: HTMLElement;

  /** 現在表示しているシーン、シーンが表示されていない場合はnullをセットする */
  scene: DOMScene | null | undefined;

  /** ゲームアクション通知ストリーム */
  gameAction: Subject<GameAction>;

  /** ゲームアクション通知ノアンサブスクライバ */
  unsubscribers: Unsubscribable[];
};

/**
 * DomSceneBinderプロパティを生成する
 *
 * @returns 生成したプロパティ
 */
export function createDOMSceneBinderProps(): DOMSceneBinderProps {
  const root = document.createElement("div");
  const gameAction = new Subject<GameAction>();
  const scene = null;
  return {
    root,
    gameAction,
    scene,
    unsubscribers: [],
  };
}
