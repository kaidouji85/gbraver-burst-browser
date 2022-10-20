// @flow
import type { DOMScene } from "./dom-scene";
import type { DOMScenesProps } from "./props";

/**
 * ルートHTML要素にシーンをバインドするヘルパー関数
 *
 * @param props DOMScenesプロパティ
 * @param scene バインドするシーン
 */
export function bindScene(props: DOMScenesProps, scene: DOMScene): void {
  props.root.appendChild(scene.getRootHTMLElement());
  props.scene = scene;
}
