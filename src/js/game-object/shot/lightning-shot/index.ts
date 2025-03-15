import { ResourcesContainer } from "../../../resource";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { LightningShot } from "./lightning-shot";
import { PlayerLightningShotView } from "./view/player-lightning-shot-view";

/**
 * プレイヤーの電撃ショットを生成する
 * @param options オプション
 * @returns プレイヤーの電撃ショット
 */
export function playerLightningShot(
  options: ResourcesContainer & GameObjectActionContainer,
): LightningShot {
  const view = new PlayerLightningShotView(options);
  return new LightningShot({ ...options, view });
}

/**
 * 敵の電撃ショットを生成する
 * @param options オプション
 * @returns 敵の電撃ショット
 */
export function enemyLightningShot(
  options: ResourcesContainer & GameObjectActionContainer,
): LightningShot {
  const view = new PlayerLightningShotView(options);
  return new LightningShot({ ...options, view });
}
