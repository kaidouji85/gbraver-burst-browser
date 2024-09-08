import { Observable } from "rxjs";

import { GameObjectAction } from "../../../game-object/action/game-object-action";

/** プライベートマッチQRコードリーダーのパラメータ */
export type PrivateMatchQRCodeReaderParams = {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** プライベートマッチQRコードリーダー */
export class PrivateMatchQRCodeReader {

}
