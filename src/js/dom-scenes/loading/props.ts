/** ローディング画面のプロパティ */
export type LoadingProps = {
  /** ローディング完了率 */
  completedRate: number;
  /** ルートHTML要素 */
  root: HTMLElement;
  /** ローディング完了率のテキスト */
  text: HTMLElement;
  /** ローディングバー */
  bar: HTMLElement;
};
