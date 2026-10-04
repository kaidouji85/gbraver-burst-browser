import { Observable } from "rxjs";

import { GameLoop } from "./game-loop";

/** ゲームループコンテナ */
export type GameLoopContainer = {
  /** ゲームループストリーム */
  gameLoop: Observable<GameLoop>;
};
