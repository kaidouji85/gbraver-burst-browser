// @flow
import type {StreamSource, Unsubscriber} from "../../stream/stream";
import type {GameAction} from "../game-actions";
import type {DOMScene} from "./dom-scene";

import { createStreamSource } from "../../stream/stream";

/** DomScenesプロパティ */
export type DOMScenesProps = {
  /** DomScenesルートHTML要素、本要素にシーンをバインドする */
  root: HTMLElement,
  /** 現在表示しているシーン、初期状態では何もシーンが表示されていないのでnullがセットされている */
  scene: ?DOMScene,
  /** ゲームアクション通知ストリーム */
  gameAction: StreamSource<GameAction>,
  /** ゲームアクション通知ノアンサブスクライバ */
  unsubscribers: Unsubscriber[],
};

/**
 * DomScenesプロパティを生成する
 * 
 * @return 生成したプロパティ
 */
export function createDOMScenesProps(): DOMScenesProps {
  const root = document.createElement('div');
  const gameAction = createStreamSource();
  const scene = null;
  const unsubscribers = [];
  return {root, gameAction, scene, unsubscribers};
}