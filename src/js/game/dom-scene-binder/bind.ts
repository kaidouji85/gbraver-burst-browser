import type { DOMScene } from "../../dom-scenes/dom-scene";
import { discardCurrentScene } from "./discard-current-scene";
import type { DOMSceneActionConnector } from "./dom-scene-action-connector";
import type { DOMSceneBinderProps } from "./props";

/**
 * DOMシーンをバインドする
 *
 * @template X シーンのデータ型
 * @param props DomSceneBinderプロパティ
 * @param scene バインドするシーン
 * @param connector ゲームアクションコネクタ
 */
export function bind<X extends DOMScene>(
  props: DOMSceneBinderProps,
  scene: X,
  connector: DOMSceneActionConnector<X>,
) {
  discardCurrentScene(props);
  props.scene = scene;
  props.root.appendChild(scene.getRootHTMLElement());
  props.unsubscribers = connector(scene, props.gameAction);
}
