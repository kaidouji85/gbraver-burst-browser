import { PostBattleFloaterProps } from "../props";

/**
 * フローターを非表示にする
 * @param props プロパティ
 */
export function hide(props: PostBattleFloaterProps): void {
  props.root.style.display = "none";
  props.unsubscribers.forEach((v) => {
    v.unsubscribe();
  });
  props.root.innerHTML = "";
}
