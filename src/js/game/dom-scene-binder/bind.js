// @flow

import type { DOMSceneActionConnector } from "./action-connector/dom-scene-action-connector";
import { discardCurrentScene } from "./discard-current-scene";
import type { DOMSceneBinderProps } from "./props";
import type { DOMScene } from "./scene/dom-scene";

/**
 * DOMシーンをバインドする
 *
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
