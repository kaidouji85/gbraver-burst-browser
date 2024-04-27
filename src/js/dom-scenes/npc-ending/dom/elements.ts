import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** 終了文言 */
  end: HTMLImageElement;
  /** ロゴ */
  logo: HTMLImageElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const selectedEnd = root.querySelector(`[data-id="${ids.end}"]`);
  const end =
    selectedEnd instanceof HTMLImageElement
      ? selectedEnd
      : document.createElement("img");
  const selectedLogo = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo =
    selectedLogo instanceof HTMLImageElement
      ? selectedLogo
      : document.createElement("img");
  return {
    end,
    logo,
  };
}
