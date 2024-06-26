import { PilotId } from "gbraver-burst-core";
import { Observable, tap } from "rxjs";

import { pop } from "../../../dom/pop";
import { domPushStream, PushDOM } from "../../../dom/push-dom";
import { getPilotIconPathId } from "../../../path/pilot-icon-path";
import type { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";

/** ルートHTML要素のclass属性 */
const ROOT_CLASS_NAME = "pilot-icon";

/** アイコン画像のclass属性 */
const IMAGE_CLASS_NAME = `${ROOT_CLASS_NAME}__image`;

/** チェックマークのclass属性 */
const CHECK_CLASS_NAME = `${ROOT_CLASS_NAME}__check`;

/** パイロットアイコン */
export class PilotIcon {
  /** パイロットID */
  readonly pilotId: PilotId;
  /** ルートHTML要素 */
  readonly #root: HTMLElement;
  /** 画像要素 */
  readonly #image: HTMLImageElement;
  /** チェックマーク画像要素 */
  readonly #check: HTMLImageElement;
  /** 画像の読み込みが完了したら発火するPromise */
  readonly #isImageLoaded: Promise<void>;
  /** チェックマークの読みこみが完了したら発火するPromise */
  readonly #isCheckLoaded: Promise<void>;
  /** パイロット選択通知 */
  readonly #select: Observable<PushDOM>;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param pilotId パイロットID
   */
  constructor(resources: Resources, pilotId: PilotId) {
    this.pilotId = pilotId;

    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;

    this.#image = document.createElement("img");
    this.#image.className = IMAGE_CLASS_NAME;
    this.#isImageLoaded = waitElementLoaded(this.#image);
    this.#image.src =
      resources.paths.find((p) => p.id === getPilotIconPathId(pilotId))?.path ??
      "";
    this.#image.alt = `パイロットアイコン ${pilotId}`;
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
   * @returns 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([this.#isImageLoaded, this.#isCheckLoaded]);
  }

  /**
   * ルートHTMLを取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * アイコン選択通知
   * @returns 通知ストリーム
   */
  notifySelection(): Observable<PushDOM> {
    return this.#select;
  }

  /**
   * ポップアニメーション
   * @returns アニメーション
   */
  async pop(): Promise<void> {
    await pop(this.#image);
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
