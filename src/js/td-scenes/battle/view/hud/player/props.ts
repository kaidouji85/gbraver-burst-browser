import { PlayerId } from "gbraver-burst-core";

import { Gauge } from "../../../../../game-object/gauge/gauge";
import { PredicatedDamage } from "../../../../../game-object/predicated-damage";
import { ResultIndicator } from "../../../../../game-object/result-indicator/result-indicator";
import { StatusIcon } from "../../../../../game-object/status-icon";
import { TurnStart } from "../../../../../game-object/turn-start/turn-start";

/** HUDプレイヤーオブジェクト プロパティ */
export type HUDPlayerProps = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** ゲージ */
  gauge: Gauge;
  /** ダメージ予想 */
  predicatedDamage: PredicatedDamage;
  /** ステータスアイコン */
  statusIcon: StatusIcon;
  /** ターン開始 */
  turnStart: TurnStart;
  /** 対象プレイヤーが勝利した場合のリザルトインジケーター */
  resultIndicator: ResultIndicator;
};
