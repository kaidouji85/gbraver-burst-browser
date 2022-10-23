// @flow

import { pop } from "../../../dom/animation";
import type { PushDOM } from "../../../dom/event-stream";
import { pushDOMStream } from "../../../dom/event-stream";
import type { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import { tap } from "../../../stream/operator";
import type { Stream } from "../../../stream/stream";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";

const ROOT_CLASS_NAME = "pilot-icon";
const IMAGE_CLASS_NAME = `${ROOT_CLASS_NAME}__image`;
const CHECK_CLASS_NAME = `${ROOT_CLASS_NAME}__check`;

/**
 * パイロットアイコン
 */
export class PilotIcon {
  #root: HTMLElement;
  #image: HTMLImageElement;
  #check: HTMLImageElement;
  #isImageLoaded: Promise<void>;
  #isCheckLoaded: Promise<void>;
  #select: Stream<PushDOM>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param path 画像パス
   * @param alt 代替テキスト
   */
  constructor(resources: Resources, path: string, alt: string) {
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;

    this.#image = document.createElement("img");
    this.#image.className = IMAGE_CLASS_NAME;
    this.#isImageLoaded = waitElementLoaded(this.#image);
    this.#image.src = path;
    this.#image.alt = alt;
    this.#root.appendChild(this.#image);

    this.#check = document.createElement("img");
    this.#check.className = CHECK_CLASS_NAME;
    this.#isCheckLoaded = waitElementLoaded(this.#check);
    this.#check.src =
      resources.paths.find((v) => v.id === PathIds.CHECK)?.path ?? "";
    this.#check.hidden = true;
    this.#root.appendChild(this.#check);

    this.#select = pushDOMStream(this.#root).chain(
      tap((action) => {
        action.event.preventDefault();
      })
    );
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this.#isImageLoaded;
  }

  /**
   * ルートHTMLを取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * アイコン選択通知
   *
   * @return 通知ストリーム
   */
  selectedNotifier(): Stream<PushDOM> {
    return this.#select;
  }

  /**
   * ポップアニメーション
   *
   * @return アニメーション
   */
  async pop(): Promise<void> {
    await pop(this.#image);
  }

  /**
   * アイコンが選択された状態にする
   *
   * @param isSelected 選択されたか否かのフラグ、trueで選択された
   */
  selected(isSelected: boolean): void {
    this.#image.className = isSelected
      ? `${IMAGE_CLASS_NAME}--selected`
      : IMAGE_CLASS_NAME;
    this.#check.hidden = !isSelected;
  }
}
