import type { DOMSceneBinderProps } from "./props";

/**
 * バインドしているシーンを破棄する
 * @param props DomSceneBinderプロパティ
 */
export function dispose(props: DOMSceneBinderProps): void {
  props.scene?.destructor();
  props.scene?.getRootHTMLElement().remove();
  props.scene = null;
  props.unsubscribers.forEach((v) => {
    v.unsubscribe();
  });
  props.unsubscribers = [];
}
