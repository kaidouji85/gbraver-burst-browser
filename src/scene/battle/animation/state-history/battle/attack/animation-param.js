// @flow

import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {TDPlayer} from "../../../../view/td/player";
import type {HUDPlayer} from "../../../../view/hud/player";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {TDGameObjects} from "../../../../view/td/game-objects";
import type {HUDGameObjects} from "../../../../view/hud/game-objects";

/**
 * 攻撃アニメーションパラメータ
 *
 * @type SPRITE 攻撃側スプライト
 * @type RESULT 戦闘結果
 */
export type AttackAnimationParam<SPRITE, RESULT> = {
  attackerState: PlayerState,
  attackerTD: TDPlayer<SPRITE>,
  attackerHUD: HUDPlayer,
  defenderState: PlayerState,
  defenderTD: TDPlayer<ArmDozerSprite>,
  defenderHUD: HUDPlayer,
  tdObjects: TDGameObjects,
  hudObjects: HUDGameObjects,
  result: RESULT
};