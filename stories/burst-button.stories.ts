import {
  genesisBraverBurstButton,
  shinBraverBurstButton,
  wingDozerBurstButton,
} from "../src/js/game-object/burst-button";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";
import {BurstButton} from "../src/js/game-object/burst-button/burst-button";
import {Resources} from "../src/js/resource";
import {Observable} from "rxjs";
import {GameObjectAction} from "../src/js/game-object/action/game-object-action";

export default {
  title: "burst-button",
};

/**
 * バーストボタンジェネレータ
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
type BurstButtonGenerator = (resources: Resources, gameObjectAction: Observable<GameObjectAction>) => BurstButton;

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
}

/** ジェネシスブレイバー */
export const genesisBraver = () => buttonStory(genesisBraverBurstButton);

export const shinBraver = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const burstButton = shinBraverBurstButton(resources, gameObjectAction);
    burstButton.notifyPressed().subscribe(() => {
      burstButton.decide().play();
    });
    burstButton.open(true).play();
    return [burstButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const wingDozer = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const burstButton = wingDozerBurstButton(resources, gameObjectAction);
    burstButton.notifyPressed().subscribe(() => {
      burstButton.decide().play();
    });
    burstButton.open(true).play();
    return [burstButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};

export const disabled = (): HTMLElement => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const burstButton = shinBraverBurstButton(resources, gameObjectAction);
    burstButton.open(false).play();
    return [burstButton.getObject3D()];
  });
  stub.start();
  return stub.domElement();
};
