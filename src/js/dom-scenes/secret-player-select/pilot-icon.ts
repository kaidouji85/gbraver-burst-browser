import { PilotId } from "gbraver-burst-core";
import { Observable, tap } from "rxjs";

import { domPushStream } from "../../dom/push-dom";
import { getPilotIconPathId } from "../../path/pilot-icon-path";
import { Resources } from "../../resource";
import { waitElementLoaded } from "../../wait/wait-element-loaded";
import { PILOT_ICON } from "./dom/class-name";

/** パイロットアイコン */
export class PilotIcon {
  /** パイロットID */
  readonly pilotId: PilotId;
  /** ルートHTML要素 */
  readonly #root: HTMLImageElement;
  /** 画像読み込みが完了したら発火するPromise */
  readonly #waitImageLoaded: Promise<void>;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param pilotId パイロットID
   */
  constructor(resources: Resources, pilotId: PilotId) {
    this.pilotId = pilotId;

    this.#root = document.createElement("img");
    this.#waitImageLoaded = waitElementLoaded(this.#root);
    this.#root.src =
      resources.paths.find((p) => p.id === getPilotIconPathId(pilotId))?.path ??
      "";
    this.#root.className = PILOT_ICON;
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * ボタン押下通知
   * @return 通知ストリーム
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
   * @return 読み込みが完了したら発火するPromise
   */
  async waitUntilLoaded(): Promise<void> {
    await this.#waitImageLoaded;
  }
}
