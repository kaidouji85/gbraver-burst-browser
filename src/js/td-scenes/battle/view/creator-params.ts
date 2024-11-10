import type { Player } from "gbraver-burst-core";
import { Observable } from "rxjs";

import type { GameLoop } from "../../../game-loop/game-loop";
import type { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import type { Resize } from "../../../window/resize";

/** すべての戦闘画面ビュー生成処理で利用できるパラメータ */
export type BattleViewCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** プレイヤー情報 */
    player: Player;
    /** 敵情報 */
    enemy: Player;
    /** ゲームループ */
    gameLoop: Observable<GameLoop>;
    /** リサイズ */
    resize: Observable<Resize>;
    /** リトライ可能かどうか、trueで可能 */
    canRetry: boolean;
  };
