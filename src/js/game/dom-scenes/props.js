// @flow
import type {StreamSource, Unsubscriber} from "../../stream/stream";
import type {GameAction} from "../game-actions";
import type {DOMScene} from "./dom-scene";

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