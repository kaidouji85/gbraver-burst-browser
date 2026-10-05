import { Player } from "gbraver-burst-core";
import { Observable } from "rxjs";

import { Resize } from "../../../../../dom/window/resize";
import { ResourcesContainer } from "../../../../../resource";
import { SEPlayerContainer } from "../../../../../sounds/se/se-player";
import { GameLoopContainer } from "../../../../game-loop/game-loop-container";

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
