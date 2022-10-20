// @flow
import type { ArmDozerId } from "gbraver-burst-core";
import type { Resources } from "../../../resource";
import { waitTime } from "../../../wait/wait-time";
import { bindScene } from "../bind-scene";
import { discardCurrentScene } from "../discard-current-scene";
import { MAX_LOADING_TIME } from "../max-loading-time";
import type { DOMScenesProps } from "../props";
import { MatchCard } from "../scene/match-card";

/**
 * 新しく対戦カード画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param resources リソース管理オブジェクト
 * @param player プレイヤー側 アームドーザID
 * @param enemy 敵側 アームドーザID
 * @param caption ステージ名
 * @return 開始された対戦カード画面
 */
export async function startMatchCard(
  props: DOMScenesProps,
  resources: Resources,
  player: ArmDozerId,
  enemy: ArmDozerId,
  caption: string
): Promise<MatchCard> {
  discardCurrentScene(props);
  const scene = new MatchCard({ resources, player, enemy, caption });
  bindScene(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}
