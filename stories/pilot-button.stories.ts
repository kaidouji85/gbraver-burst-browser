import { Observable } from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  gaiPilotButton,
  raitoPilotButton,
  shinyaPilotButton,
  tsubasaPilotButton,
  yuuyaPilotButton,
} from "../src/js/game-object/pilot-button";
import { PilotButton } from "../src/js/game-object/pilot-button/pilot-button";
import { Resources } from "../src/js/resource";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";

export default {
  title: "pilot-button",
};

/**
 * パイロットボタンのストーリー
 * @param generator パイロットボタン生成関数
 * @param fn パイロットボタン操作関数
 * @return story
 */
const pilotButtonStory =
  (
    generator: (params: {
      resources: Resources;
      gameObjectAction: Observable<GameObjectAction>;
    }) => PilotButton,
    fn: (button: PilotButton) => void,
  ) =>
  () => {
    const stub = new HUDGameObjectStub((params) => {
      const button = generator(params);
      fn(button);
      return [button.getObject3D()];
    });
    stub.start();
    return stub.domElement();
  };

/**
 * 操作可能なパイロットボタン
 * @param button パイロットボタン
 */
const operatable = (button: PilotButton) => {
  button.notifyPressed().subscribe(() => {
    console.log("push button!!");
    const animation = button
      .decide()
      .chain(delay(1000))
      .chain(button.close())
      .chain(delay(1000))
      .chain(button.open(false));
    animation.play();
  });
  button.open(true).play();
};

/** シンヤ */
export const shinya = pilotButtonStory(shinyaPilotButton, operatable);

/** ガイ */
export const gai = pilotButtonStory(gaiPilotButton, operatable);

/** ライト */
export const raito = pilotButtonStory(raitoPilotButton, operatable);

/** ツバサ */
export const tsubasa = pilotButtonStory(tsubasaPilotButton, operatable);

/** ユウヤ */
export const yuuya = pilotButtonStory(yuuyaPilotButton, operatable);

/**
 * 操作不可能なパイロットボタン
 * @param button
 */
const dislabed = (button: PilotButton) => {
  operatable(button);
  button.disabled(true);
};

/** 操作不能 シンヤ */
export const disabledShinya = pilotButtonStory(shinyaPilotButton, dislabed);
