// @flow

import type { DOMSceneActionConnector } from "./action-connector/dom-scene-action-connector";
import { discardCurrentScene } from "./discard-current-scene";
import type { DOMScene } from "./dom-scene";
import type { DOMScenesProps } from "./props";

/**
 * DOMシーンをバインドする
 *
 * @param props DomScenesプロパティ
 * @param scene バインドするシーン
 * @param connector ゲームアクションコネクタ
 */
export function bind<X: DOMScene>(
  props: DOMScenesProps,
  scene: X,
  connector: DOMSceneActionConnector<X>
) {
  discardCurrentScene(props);
  props.scene = scene;
  props.root.appendChild(scene.getRootHTMLElement());
  props.unsubscribers = connector(scene, props.gameAction);
}
