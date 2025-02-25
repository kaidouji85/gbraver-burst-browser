import { PostBattleFloaterProps } from "../props";

/**
 * フローターを非表示にする
 * @param props プロパティ
 */
export function hide(props: PostBattleFloaterProps): void {
  props.unsubscribers.forEach((v) => {
    v.unsubscribe();
  });
  props.root.innerHTML = "";

  props.abortController.abort();
  props.abortController = new AbortController();
}
