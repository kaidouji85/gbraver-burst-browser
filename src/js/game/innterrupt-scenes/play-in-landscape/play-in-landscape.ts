import type { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";

/** ルート要素class属性 */
const ROOT_CLASS = "play-in-landscape";

/**
 * ルート要素innerHTML
 *
 * @param resources リソース管理オブジェクト
 * @returns ルート要素innerHTML
 */
function rootInnerHTML(resources: Resources) {
  const playInLandscapePath =
    resources.paths.find((v) => v.id === PathIds.PLAY_IN_LANDSCAPE)?.path ?? "";
  return `
    <span class="${ROOT_CLASS}__caption">横向きでプレイしてください</span>
    <img class="${ROOT_CLASS}__image" src = "${playInLandscapePath}"/>
  `;
}

/** ランドスケープ警告 */
export class PlayInLandscape {
  #root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(resources);
  }

  /**
   * ルートHTML要素を取得する
   *
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
