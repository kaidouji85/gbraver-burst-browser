// @flow

import type { DOMScene } from "../../dom-scenes/dom-scene";
import type { DOMSceneActionConnector } from "./action-connector/dom-scene-action-connector";
import { discardCurrentScene } from "./discard-current-scene";
import type { DOMSceneBinderProps } from "./props";

/**
 * DOMシーンをバインドする
 *
 * @template X シーンのデータ型
 * @param props DomSceneBinderプロパティ
 * @param scene バインドするシーン
 * @param connector ゲームアクションコネクタ
 */
export function bind<X: DOMScene>(
  props: DOMSceneBinderProps,
  scene: X,
  connector: DOMSceneActionConnector<X>
) {
  discardCurrentScene(props);
  props.scene = scene;
  props.root.appendChild(scene.getRootHTMLElement());
  props.unsubscribers = connector(scene, props.gameAction);
}
