import { PostBattleFloaterProps } from "../props";

/**
 * デストラクタ相当の処理
 * @param props プロパティ
 */
export function destructor(props: PostBattleFloaterProps): void {
  props.unsubscribers.forEach((v) => {
    v.unsubscribe();
  });
  props.root.innerHTML = "";
}
