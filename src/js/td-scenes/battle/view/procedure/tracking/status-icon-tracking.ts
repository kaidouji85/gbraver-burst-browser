import { toHUDCoordinate } from "../../../../../tracking/to-hud-coordinate";
import { TrackingParams } from "./tracking-params";

/**
 * ステータスアイコンのトラッキング
 * @param params パラメータ
 */
export function statusIconTracking(params: TrackingParams) {
  const { td, hud, rendererDOM } = params;
  hud.players.forEach(({ playerId, statusIcon }) => {
    const armdozer = td.armdozers.find((a) => a.playerId === playerId);
    if (!armdozer) {
      return;
    }

    const origin = armdozer.sprite().statusIconPosition;
    const hudCoordinate = toHUDCoordinate(
      origin,
      td.camera.getCamera(),
      rendererDOM,
    );
    statusIcon.getObject3D().position.x = hudCoordinate.x;
    statusIcon.getObject3D().position.y = hudCoordinate.y;
  });
}
