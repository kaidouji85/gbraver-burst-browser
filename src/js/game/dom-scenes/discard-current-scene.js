// @flow
import type { DOMScenesProps } from "./props";

/**
 * 現在表示しているシーンを破棄するヘルパー関数
 *
 * @param props DomScenesプロパティ
 */
export function discardCurrentScene(props: DOMScenesProps): void {
  props.scene && props.scene.destructor();
  props.scene && props.scene.getRootHTMLElement().remove();
  props.scene = null;
  props.unsubscribers.forEach((v) => {
    v.unsubscribe();
  });
  props.unsubscribers = [];
}
