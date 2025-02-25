import { PostBattleFloaterProps } from "../props";

/**
 * フローターを非表示にする
 * @param props プロパティ
 */
export function hidden(props: Readonly<PostBattleFloaterProps>): void {
  props.unsubscribers.forEach((v) => {
    v.unsubscribe();
  });
  props.root.innerHTML = "";
  props.abortController.abort();
}
