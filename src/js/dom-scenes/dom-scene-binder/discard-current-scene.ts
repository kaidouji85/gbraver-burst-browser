import type { DOMSceneBinderProps } from "./props";

/**
 * 現在表示しているシーンを破棄するヘルパー関数
 *
 * @param props DomSceneBinderプロパティ
 */
export function discardCurrentScene(props: DOMSceneBinderProps): void {
  props.scene?.destructor();
  props.scene?.getRootHTMLElement().remove();
  props.scene = null;
  props.unsubscribers.forEach((v) => {
    v.unsubscribe();
  });
  props.unsubscribers = [];
}
