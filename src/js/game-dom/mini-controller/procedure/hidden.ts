import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { hiddenRoot } from "../animation/hidden-root";
import { ROOT_INVISIBLE } from "../dom/class-name";
import { MiniControllerProps } from "../props";
import { disabledAllButtons } from "./disabled-all-buttons";

/**
 * ミニコントローラーを非表示にする
 * @param props コンポネントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export function hidden(props: Readonly<MiniControllerProps>): Animate {
  return hiddenRoot(props).chain(
    process(() => {
      props.root.className = ROOT_INVISIBLE;
      disabledAllButtons(props);
    })
  );
}
