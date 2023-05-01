import { ROOT_INVISIBLE } from "../dom/class-name";
import { hiddenRoot } from "../dom/hidden-root";
import { MiniControllerProps } from "../props";

/**
 * ミニコントローラーを非表示にする
 * @param props コンポネントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function hidden(props: Readonly<MiniControllerProps>): Promise<void> {
  await hiddenRoot(props.root);
  props.root.className = ROOT_INVISIBLE;
}
