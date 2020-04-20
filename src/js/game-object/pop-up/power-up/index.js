// @flow

import {PopUp} from "../pop-up/pop-up";
import type {Resources} from "../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";
import {PlayerPowerUpView} from "./view/player-power-up-view";

/**
 * プレイヤー 攻撃アップ ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function playerPowerUp(resources: Resources, listener: Observable<GameObjectAction>): PopUp {
  const view = new PlayerPowerUpView(resources);
  return new PopUp(view, listener);
}

/**
 * 敵 攻撃アップ ポップアップ
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return 生成結果
 */
export function enemyPowerUp(resources: Resources, listener: Observable<GameObjectAction>): PopUp {
  const view = new PlayerPowerUpView(resources);
  return new PopUp(view, listener);
}