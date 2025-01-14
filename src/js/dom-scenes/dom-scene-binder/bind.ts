import { Unsubscribable } from "rxjs";

import { DOMScene } from "../dom-scene";
import { dispose } from "./dispose";
import { DOMSceneBinderProps } from "./props";

/**
 * DOMシーンをバインドする
 * @template X シーンのデータ型
 * @param props DomSceneBinderプロパティ
 * @param scene バインドするシーン
 * @param unsubscribers バインドするシーンに関連するアンサブスクライバ
 */
export function bind<X extends DOMScene>(
  props: DOMSceneBinderProps,
  scene: X,
  unsubscribers: Unsubscribable[],
) {
  dispose(props);
  props.scene = scene;
  props.root.appendChild(scene.getRootHTMLElement());
  props.unsubscribers = unsubscribers;
}
