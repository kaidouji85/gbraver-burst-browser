import { ResourcesContainer } from "../../../resource";
import { LightningShot } from "./lightning-shot";
import { PlayerLightningShotView } from "./view/player-lightning-shot-view";

/**
 * プレイヤーの電撃ショットを生成する
 * @param options オプション
 * @returns プレイヤーの電撃ショット
 */
export function playerLightningShot(
  options: ResourcesContainer,
): LightningShot {
  const view = new PlayerLightningShotView(options);
  return new LightningShot({ ...options, view });
}
