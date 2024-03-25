import { Observable, tap } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import type { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";

/** ルートHTML要素のclass属性 */
const ROOT_CLASS_NAME = "armdozer-icon";

/** 画像のclass属性 */
const IMAGE_CLASS_NAME = `${ROOT_CLASS_NAME}__image`;

/** チェックマークのclass属性 */
const CHECK_CLASS_NAME = `${ROOT_CLASS_NAME}__check`;

/** アームドーザアイコン */
export class ArmdozerIcon {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** アイコン画像 */
  #image: HTMLImageElement;
  /** チェックマーク */
  #check: HTMLImageElement;
  /** アイコン画像の読み込みが完了したら発火するPromise */
  #isImageLoaded: Promise<void>;
  /** チェックマーク画像の読み込みが完了したら発火するPromise */
  #isCheckLoaded: Promise<void>;
  /** 選択通知ストリーム */
  #select: Observable<PushDOM>;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param imagePath 画像ファイルのパス
   * @param alt 代替テキスト
   */
  constructor(resources: Resources, imagePath: string, alt: string) {
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;
    this.#image = document.createElement("img");
    this.#image.className = IMAGE_CLASS_NAME;
    this.#isImageLoaded = waitElementLoaded(this.#image);
    this.#image.src = imagePath;
    this.#image.alt = alt;
    this.#root.appendChild(this.#image);
    this.#check = document.createElement("img");
    this.#check.className = CHECK_CLASS_NAME;
    this.#isCheckLoaded = waitElementLoaded(this.#check);
    this.#check.src =
      resources.paths.find((v) => v.id === PathIds.CHECK)?.path ?? "";
    this.#check.hidden = true;
    this.#root.appendChild(this.#check);
    this.#select = domPushStream(this.#root).pipe(
      tap((action) => {
        action.event.preventDefault();
      }),
    );
  }

  /**
   * リソース読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([this.#isImageLoaded, this.#isCheckLoaded]);
  }

  /**
   * ルートHTMLを取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * アイコン選択通知
   * @return 通知ストリーム
   */
  notifySelection(): Observable<PushDOM> {
    return this.#select;
  }

  /**
   * ポップアニメーション
   * @return アニメーション
   */
  async pop(): Promise<void> {
    await pop(this.#root);
  }

  /**
   * アイコンが選択された状態にする
   * @param isSelected 選択されたか否かのフラグ、trueで選択された
   */
  selected(isSelected: boolean): void {
    this.#image.className = isSelected
      ? `${IMAGE_CLASS_NAME}--selected`
      : IMAGE_CLASS_NAME;
    this.#check.hidden = !isSelected;
  }
}
