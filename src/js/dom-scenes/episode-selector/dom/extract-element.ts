/**
 * エピソード一覧を抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractEpisodes(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="episodes"]`) ?? document.createElement("div")
  );
}

/**
 * イメージカット集合のルート要素を抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractEpisodeImageCutContainer(
  root: HTMLElement,
): HTMLElement {
  return (
    root.querySelector(`[data-id="episodeImageCutContainer"]`) ??
    document.createElement("div")
  );
}

/**
 * メインエピソードタブを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractMainEpisodeTab(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="mainEpisodeTab"]`) ??
    document.createElement("div")
  );
}

/**
 * サイドエピソードタブを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractSideEpisodeTab(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="sideEpisodeTab"]`) ??
    document.createElement("div")
  );
}

/**
 * エピソードタイトルを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractEpisodeTitle(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="episodeTitle"]`) ??
    document.createElement("div")
  );
}

/**
 * エピソード導入を抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractEpisodeIntroduction(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="episodeIntroduction"]`) ??
    document.createElement("div")
  );
}

/**
 * 戻るボタンを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractPlayButton(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="playButton"]`) ??
    document.createElement("div")
  );
}

/**
 * 戻るボタンを抽出する
 * @param root ルート要素
 * @return 取得結果
 */
export function extractPrevButton(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="prevButton"]`) ??
    document.createElement("div")
  );
}
