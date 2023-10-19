import { Subject } from "rxjs";

/** エピソードHTML要素プロパティ */
export type EpisodeElementProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** チェック */
  checker: HTMLElement;
  /** 選択通知ストリーム */
  select: Subject<void>;
};
