import { Observable } from "rxjs";

import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  genesisBraverBurstButton,
  lightningDozerBurstButton,
  neoLandozerBurstButton,
  shinBraverBurstButton,
  wingDozerBurstButton,
} from "../src/js/game-object/burst-button";
import { BurstButton } from "../src/js/game-object/burst-button/burst-button";
import { Resources } from "../src/js/resource";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "burst-button",
};

/**
 * バーストボタン生成関数
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
type BurstButtonGenerator = (
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
) => BurstButton;

/**
 * バーストボタンストーリー
 * @param generator バーストボタン生成関数
 * @param burstButton バーストボタン操作関数
 */
const buttonStory =
  (generator: BurstButtonGenerator, fn: (burstButton: BurstButton) => void) =>
  () => {
    const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
      const burstButton = generator(resources, gameObjectAction);
      fn(burstButton);
      return [burstButton.getObject3D()];
    });
    stub.start();
    return stub.domElement();
  };

/**
 * 操作可能
 * @param burstButton バーストボタン
 */
const operatable = (burstButton: BurstButton) => {
  burstButton.notifyPressed().subscribe(() => {
    burstButton.decide().play();
  });
  burstButton.open(true).play();
};

/** シンブレイバー */
export const shinBraver = buttonStory(shinBraverBurstButton, operatable);

/** ネオランドーザ */
export const neoLandozer = buttonStory(neoLandozerBurstButton, operatable);

/** ライトニングドーザ */
export const lightningDozer = buttonStory(
  lightningDozerBurstButton,
  operatable
);

/** ウィングドーザ */
export const wingDozer = buttonStory(wingDozerBurstButton, operatable);

/** ジェネシスブレイバー */
export const genesisBraver = buttonStory(genesisBraverBurstButton, operatable);

/**
 * バースト不可能
 * @param burstButton バーストボタン
 */
const canNotBurst = (burstButton: BurstButton) => {
  burstButton.notifyPressed().subscribe(() => {
    burstButton.decide().play();
  });
  burstButton.open(false).play();
};

/** シンブレイバー バースト不可能 */
export const canNotBurstShinBraver = buttonStory(
  shinBraverBurstButton,
  canNotBurst
);

/**
 * 操作不可能
 * @param burstButton バーストボタン
 */
const disabled = (burstButton: BurstButton) => {
  operatable(burstButton);
  burstButton.disabled(true);
};

/** シンブレイバー 操作不可能 */
export const disabledShinBraver = buttonStory(shinBraverBurstButton, disabled);
