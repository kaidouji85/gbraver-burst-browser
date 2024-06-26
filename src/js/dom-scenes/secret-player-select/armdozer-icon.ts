import { ArmdozerId } from "gbraver-burst-core";
import { Observable, tap } from "rxjs";

import { domPushStream } from "../../dom/push-dom";
import { getArmdozerIconPathId } from "../../path/armdozer-icon-path";
import { Resources } from "../../resource";
import { waitElementLoaded } from "../../wait/wait-element-loaded";
import { ARMDOZER_ICON } from "./dom/class-name";

/** アームドーザアイコン */
export class ArmdozerIcon {
  /** アームドーザID */
  readonly armdozerId: ArmdozerId;
  /** ルートHTML要素 */
  readonly #root: HTMLImageElement;
  /** 画像読み込みが完了したら発火するPromise */
  readonly #waitImageLoaded: Promise<void>;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armdozerId アームドーザID
   */
  constructor(resources: Resources, armdozerId: ArmdozerId) {
    this.armdozerId = armdozerId;

    this.#root = document.createElement("img");
    this.#waitImageLoaded = waitElementLoaded(this.#root);
    this.#root.className = ARMDOZER_ICON;
    this.#root.src =
      resources.paths.find((p) => p.id === getArmdozerIconPathId(armdozerId))
        ?.path ?? "";
  }

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * ボタン押下通知
   * @returns 通知ストリーム
   */
  notifyPush(): Observable<unknown> {
    return domPushStream(this.#root).pipe(
      tap((action) => {
        action.event.preventDefault();
        action.event.stopPropagation();
      }),
    );
  }

  /**
   * 画像読み込みが完了するまで待つ
   * @returns 読み込みが完了したら発火するPromise
   */
  async waitUntilLoaded(): Promise<void> {
    await this.#waitImageLoaded;
  }
}
