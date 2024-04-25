import { Observable } from "rxjs";

import { BattleSceneAction } from "../../actions";
import { battleActionNotifier } from "./procedure/battle-action-notifier";
import {
  createHUDLayerProps,
  HUDLayerPropsCreatorParams,
} from "./procedure/create-hud-layer-props";
import { destructor } from "./procedure/destructor";
import { HUDLayerProps } from "./props";

/** HUDレイヤーで使用するオブジェクトを全て集めたもの */
export type HUDLayer = Omit<HUDLayerProps, "overlap" | "gameObjectAction"> & {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * 戦闘シーンアクション通知
   * @returns 通知ストリーム
   */
  battleActionNotifier(): Observable<BattleSceneAction>;
};

/** 生成パラメータ */
type HUDLayerCreatorParams = HUDLayerPropsCreatorParams;

/**
 * HUDLayerを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createHUDLayer(params: HUDLayerCreatorParams): HUDLayer {
  const props = createHUDLayerProps(params);
  return {
    ...props,
    destructor: () => destructor(props),
    battleActionNotifier: () => battleActionNotifier(props),
  };
}
