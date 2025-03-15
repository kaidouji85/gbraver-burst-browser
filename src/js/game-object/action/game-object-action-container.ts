import { Observable } from "rxjs";

import { GameObjectAction } from "./game-object-action";

/** ゲームオブジェクトアクションコンテナ */
export type GameObjectActionContainer = {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};
