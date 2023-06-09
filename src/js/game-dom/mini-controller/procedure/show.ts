import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { showRoot } from "../animation/show-root";
import { ROOT } from "../dom/class-name";
import { MiniControllerProps } from "../props";

/**
 * ミニコントローラを表示する
 * @param props コンポネントプロパティ
 * @return アニメーション
 */
export function show(props: MiniControllerProps): Animate {
  return process(() => {
    props.root.className = ROOT;
  }).chain(showRoot(props));
}
