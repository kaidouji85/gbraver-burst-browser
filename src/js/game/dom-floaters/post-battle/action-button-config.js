// @flow
import type {PostBattle} from "../../post-battle";

/** ボタンのスタイル */
export type ButtonStyle = 'MainButton' | 'SubButton';

/** 戦闘終了後アクショボタン設定 */
export type ActionButtonConfig = {
  /** 戦闘終了後のアクション */
  action: PostBattle,
  /** ボタンのスタイル */
  style: ButtonStyle,
  /** ボタンの文言 */
  label: string,
};