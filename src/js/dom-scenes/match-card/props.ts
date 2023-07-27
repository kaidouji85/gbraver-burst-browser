/** マッチカード画面プロパティ */
export type MatchCardProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** プレイヤー画像の読み込みが完了したら発火するPromise */
  isPlayerLoaded: Promise<void>;
  /** 敵画像の読み込みが完了したら発火するPromise */
  isEnemyLoaded: Promise<void>;
};
