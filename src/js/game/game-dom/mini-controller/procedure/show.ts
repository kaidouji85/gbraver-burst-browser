import { Animate } from "../../../../animation/object-animation/animate";
import { onStart } from "../../../../animation/object-animation/on-start";
import { showRoot } from "../animation/show-root";
import { ROOT } from "../dom/class-name";
import { MiniControllerProps } from "../props";

/**
 * ミニコントローラを表示する
 * @param props コンポネントプロパティ
 * @returns アニメーション
 */
export function show(props: MiniControllerProps): Animate {
  return onStart(() => {
    props.root.className = ROOT;
  }).chain(showRoot(props));
}
