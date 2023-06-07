import { CSS_PROPS_BRIGHTNESS } from "../dom/css-custom-props";
import { MessageWindowProps } from "../props";

/**
 * ウインドウを暗くする
 * @param props メッセージウインドウのプロパティ
 */
export function darken(props: Readonly<MessageWindowProps>): void {
  props.root.style.setProperty(CSS_PROPS_BRIGHTNESS, `brightness(0.5)`);
}
