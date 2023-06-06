import { CSS_PROPS_BRIGHTNESS } from "../dom/css-custom-props";
import { MessageWindowProps } from "../props";

/**
 * ウインドウを標準の明るさにする
 * @param props コンポネントプロパティ
 */
export function lighten(props: Readonly<MessageWindowProps>): void {
  props.root.style.setProperty(CSS_PROPS_BRIGHTNESS, `brightness(1)`);
}
