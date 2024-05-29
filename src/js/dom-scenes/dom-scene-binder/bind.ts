import { DOMScene } from "../dom-scene";
import { DOMSceneActionConnector } from "./action-connector";
import { discardCurrentScene } from "./discard-current-scene";
import { DOMSceneBinderProps } from "./props";

/**
 * DOMシーンをバインドする
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
  props.unsubscribers = connector(scene);
}
