import type { DOMScene } from "../../dom-scenes/dom-scene";
import type { StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import type { GameAction } from "../game-actions";

/** DomSceneBinderプロパティ */
export type DOMSceneBinderProps = {
  /** DomSceneBinderルートHTML要素、本要素にシーンをバインドする */
  root: HTMLElement;

  /** 現在表示しているシーン、シーンが表示されていない場合はnullをセットする */
  scene: DOMScene | null | undefined;

  /** ゲームアクション通知ストリーム */
  gameAction: StreamSource<GameAction>;

  /** ゲームアクション通知ノアンサブスクライバ */
  unsubscribers: Unsubscriber[];
};

/**
 * DomSceneBinderプロパティを生成する
 *
 * @return 生成したプロパティ
 */
export function createDOMSceneBinderProps(): DOMSceneBinderProps {
  const root = document.createElement("div");
  const gameAction = createStreamSource<GameAction>();
  const scene = null;
  return {
    root,
    gameAction,
    scene,
    unsubscribers: []
  };
}