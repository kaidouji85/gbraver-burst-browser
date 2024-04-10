import type { Player } from "gbraver-burst-core";
import { Observable } from "rxjs";

import type { GameLoop } from "../../../game-loop/game-loop";
import type { Resources } from "../../../resource";
import type { Resize } from "../../../window/resize";

/** すべての戦闘画面ビュー生成処理で利用できるパラメータ */
export type GenerateBattleViewParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** プレイヤー情報 */
  player: Player;
  /** 敵情報 */
  enemy: Player;
  /** ゲームループ */
  gameLoop: Observable<GameLoop>;
  /** リサイズ */
  resize: Observable<Resize>;
};
