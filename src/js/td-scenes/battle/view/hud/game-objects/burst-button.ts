import type { ArmDozerId } from "gbraver-burst-core";
import { ArmDozerIds } from "gbraver-burst-core";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import { lightningDozerBurstButton, neoLandozerBurstButton, shinBraverBurstButton, wingDozerBurstButton } from "../../../../../game-object/burst-button";
import { BurstButton } from "../../../../../game-object/burst-button/burst-button";
import type { Resources } from "../../../../../resource";
import type { Stream } from "../../../../../stream/stream";

/**
 * アームドーザIDに対応したバーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param armDozerId アームドーザID
 * @return バーストボタン
 */
export function createBurstButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>, armDozerId: ArmDozerId): BurstButton {
  switch (armDozerId) {
    case ArmDozerIds.SHIN_BRAVER:
      return shinBraverBurstButton(resources, gameObjectAction);

    case ArmDozerIds.NEO_LANDOZER:
      return neoLandozerBurstButton(resources, gameObjectAction);

    case ArmDozerIds.LIGHTNING_DOZER:
      return lightningDozerBurstButton(resources, gameObjectAction);

    case ArmDozerIds.WING_DOZER:
      return wingDozerBurstButton(resources, gameObjectAction);

    default:
      return shinBraverBurstButton(resources, gameObjectAction);
  }
}