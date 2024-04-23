import { PlayerId } from "gbraver-burst-core";

import { Gauge } from "../../../../../game-object/gauge/gauge";
import { ResultIndicator } from "../../../../../game-object/result-indicator/result-indicator";
import { TurnStart } from "../../../../../game-object/turn-start/turn-start";

/** HUDプレイヤーオブジェクト プロパティ */
export type HUDPlayerProps = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** ゲージ */
  gauge: Gauge;
  /** ターン開始 */
  turnStart: TurnStart;
  /** リザルト */
  resultIndicator: ResultIndicator;
};
