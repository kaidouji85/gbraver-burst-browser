import { BattleHamburgerMenuProps } from "../props";

/**
 * ステータスを開く系の項目を選択可能にする
 * @param props プロパティ
 */
export function enableStatusOpening(props: BattleHamburgerMenuProps) {
  props.canStatusOpening = true;
}
