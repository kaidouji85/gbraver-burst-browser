/** ステージタイトル画面 プロパティ */
export type StageTitleProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** アームドーザアイコンの読み込みが完了しているか、trueで読み込み完了 */
  isArmDozerIconLoaded: Promise<void>;
};