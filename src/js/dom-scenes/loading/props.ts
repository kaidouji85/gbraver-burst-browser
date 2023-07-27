/** ローディング画面のプロパティ */
export type LoadingProps = {
  /** 
   * 0～1で指定するローディング完了率
   * イベント発火の順番で、進捗率が下がって通知されることがあるので、
   * 最後に通知された進捗率の最大値を保持する
   */
  completedRate: number;
  /** ルートHTML要素 */
  root: HTMLElement;
  /** ローディング完了率のテキスト */
  text: HTMLElement;
  /** ローディングバー */
  bar: HTMLElement;
};
