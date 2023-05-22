import { Observable } from "rxjs";
import { delay } from "../src/js/animation/delay";
import {
  gaiPilotButton,
  raitoPilotButton,
  shinyaPilotButton,
  tsubasaPilotButton,
} from "../src/js/game-object/pilot-button";
import { Resources } from "../src/js/resource";
import { HUDGameObjectStub } from "./stub/hud-game-object-stub";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import { PilotButton } from "../src/js/game-object/pilot-button/pilot-button";

export default {
  title: "pilot-button",
};

/**
 * パイロットボタンのストーリー
 * @param generator パイロットボタン生成関数
 * @param fn パイロットボタン操作関数
 * @return story
 */
const pilotButtonStory = (
  generator: (resources: Resources, gameObjectAction: Observable<GameObjectAction>) => PilotButton,
  fn: (button: PilotButton) => void
) => () => {
  const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
    const button = generator(resources, gameObjectAction);
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
