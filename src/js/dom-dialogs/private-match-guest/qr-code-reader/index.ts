import { Observable } from "rxjs";

import { GameObjectAction } from "../../../game-object/action/game-object-action";
import { createPrivateMatchQRCodeReaderProps } from "./procedure/create-private-match-qr-code-reader-props";
import { startCamera } from "./procedure/start-camera";
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

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createPrivateMatchQRCodeReaderProps();
  }

  /**
   * プライベートマッチQRコードリーダーを開始する
   */
  async start() {
    await startCamera(this.#props);
  }

  /**
   * ルートHTML要素を取得する
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLCanvasElement {
    return this.#props.root;
  }
}
