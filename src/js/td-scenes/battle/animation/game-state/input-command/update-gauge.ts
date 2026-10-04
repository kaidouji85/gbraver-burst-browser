import { PlayerState } from "gbraver-burst-core";

import { all } from "../../../../../animation/object-animation/all";
import { Animate } from "../../../../../animation/object-animation/animate";
import { empty } from "../../../../../animation/object-animation/delay";
import { HUDPlayer } from "../../../view/hud/player";

/**
 * ゲージを更新する
 * @param hudPlayers HUDプレイヤーオブジェクトをあつめたもの
 * @param players プレイヤーステート
 * @returns アニメーション
 */
export const updateGauge = (
  hudPlayers: HUDPlayer[],
  players: PlayerState[],
): Animate =>
  all(
    ...hudPlayers.map((hud) => {
      const player = players.find((p) => p.playerId === hud.playerId);
      return player
        ? all(
            hud.gauge.hp(player.armdozer.hp),
            hud.gauge.battery(player.armdozer.battery),
          )
        : empty();
    }),
  );
