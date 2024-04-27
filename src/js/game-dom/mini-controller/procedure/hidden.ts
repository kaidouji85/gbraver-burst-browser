import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { hiddenRoot } from "../animation/hidden-root";
import { ROOT_INVISIBLE } from "../dom/class-name";
import { MiniControllerProps } from "../props";

/**
 * ミニコントローラーを非表示にする
 * @param props コンポネントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export function hidden(props: Readonly<MiniControllerProps>): Animate {
  return hiddenRoot(props).chain(
    onStart(() => {
      props.root.className = ROOT_INVISIBLE;
    }),
  );
}
