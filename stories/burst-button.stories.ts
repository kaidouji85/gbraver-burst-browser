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
 * バーストボタンジェネレータ
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
 * @param generator バーストボタンジェネレータ
 */
const buttonStory = (generator: BurstButtonGenerator): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const burstButton = generator(resources, gameObjectAction);
    burstButton.notifyPressed().subscribe(() => {
      burstButton.decide().play();
    });
    burstButton.open(true).play();
    return [burstButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

/** シンブレイバー */
export const shinBraver = () => buttonStory(shinBraverBurstButton);

/** ネオランドーザ */
export const neoLandozer = () => buttonStory(neoLandozerBurstButton);

/** ライトニングドーザ */
export const lightningDozer = () => buttonStory(lightningDozerBurstButton);

/** ウィングドーザ */
export const wingDozer = () => buttonStory(wingDozerBurstButton);

/** ジェネシスブレイバー */
export const genesisBraver = () => buttonStory(genesisBraverBurstButton);

/** disabledボタン */
export const disabled = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const burstButton = shinBraverBurstButton(resources, gameObjectAction);
    burstButton.open(false).play();
    return [burstButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
