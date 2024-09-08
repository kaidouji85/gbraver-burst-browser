import { Observable, Unsubscribable } from "rxjs";

import { gameLoopStream } from "../../../game-loop/game-loop";
import { GameObjectAction } from "../../../game-object/action/game-object-action";
import { createPrivateMatchQRCodeReaderProps } from "./procedure/create-private-match-qr-code-reader-props";
import { onGameLoop } from "./procedure/on-game-loop";
import { startCamera } from "./procedure/start-camera";
import { stopCamera } from "./procedure/stop-camera";
import { PrivateMatchQRCodeReaderProps } from "./props";

/** プライベートマッチQRコードリーダーのパラメータ */
export type PrivateMatchQRCodeReaderParams = {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** プライベートマッチQRコードリーダー */
export class PrivateMatchQRCodeReader {
  /** プロパティ */
  #props: PrivateMatchQRCodeReaderProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPrivateMatchQRCodeReaderProps();
    this.#unsubscribers = [];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
    stopCamera(this.#props);
  }

  /**
   * プライベートマッチQRコードリーダーを開始する
   */
  async start() {
    await startCamera(this.#props);
    this.#unsubscribers = [
      gameLoopStream().subscribe(() => {
        onGameLoop(this.#props);
      }),
    ];
  }

  /**
   * QRコード読み取りを通知する
   * @returns QRコード読み取りの通知
   */
  notifyReadQRCode(): Observable<string> {
    return this.#props.notificationOfReadQRCode;
  }

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLCanvasElement {
    return this.#props.root;
  }
}
