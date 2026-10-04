import { Player } from "gbraver-burst-core";
import { Observable } from "rxjs";

import { GameLoopContainer } from "../../../../game-loop/game-loop-container";
import { ResourcesContainer } from "../../../../../resource";
import { SEPlayerContainer } from "../../../../../sounds/se/se-player";
import { Resize } from "../../../../../dom/window/resize";

/** すべての戦闘画面ビュー生成処理で利用できるパラメータ */
export type BattleViewCreatorParams = ResourcesContainer &
  SEPlayerContainer &
  GameLoopContainer & {
    /** プレイヤー情報 */
    player: Player;
    /** 敵情報 */
    enemy: Player;
    /** リサイズ */
    resize: Observable<Resize>;
    /** リトライ可能かどうか、trueで可能 */
    canRetry: boolean;
  };
