import type { Player } from "gbraver-burst-core";
import { Observable } from "rxjs";

import type { GameLoop } from "../../../game-loop/game-loop";
import type { Resources } from "../../../resource";
import { SEPlayer } from "../../../se/se-player";
import type { Resize } from "../../../window/resize";

/** すべての戦闘画面ビュー生成処理で利用できるパラメータ */
export type BattleViewCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生 */
  se: SEPlayer;
  /** プレイヤー情報 */
  player: Player;
  /** 敵情報 */
  enemy: Player;
  /** ゲームループ */
  gameLoop: Observable<GameLoop>;
  /** リサイズ */
  resize: Observable<Resize>;
};
