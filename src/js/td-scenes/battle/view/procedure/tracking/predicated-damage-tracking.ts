import { toHUDCoordinate } from "../../../../../tracking/to-hud-coordinate";
import { TrackingParams } from "./tracking-params";

/**
 * 予想ダメージのトラッキング
 * @param params パラメータ
 */
export function predicatedDamageTracking(params: TrackingParams) {
  const { td, hud, rendererDOM } = params;
  hud.players.forEach(({ playerId, predicatedDamage }) => {
    const armdozer = td.armdozers.find((a) => a.playerId === playerId);
    if (!armdozer) {
      return;
    }

    const origin = armdozer.sprite().predicatedDamagePosition;
    const hudCoordinate = toHUDCoordinate(
      origin,
      td.camera.getCamera(),
      rendererDOM,
    );
    predicatedDamage.getObject3D().position.x = hudCoordinate.x;
    predicatedDamage.getObject3D().position.y = hudCoordinate.y;
  });
}
