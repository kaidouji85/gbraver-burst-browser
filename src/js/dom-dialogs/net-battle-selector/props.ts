/** ネットバトルセレクターのプロパティ */
export type NetBattleSelectrProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * NetBattleSelectrPropsを生成する
 * @return 生成結果
 */
export function createNetBattleSelectrProps(): NetBattleSelectrProps {
  const root = document.createElement("div");
  return { root };
}
