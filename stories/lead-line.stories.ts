import {HUDGameObjectStub} from "./stub/hud-game-object-stub";
import {Leadline} from "../src/js/game-object/lead-line/lead-line";

export default {
  title: "lead-line",
}

/**
 * 引き出し線ストーリー
 * @param fn 引き出し線操作関数
 */
const leadLineStory =
  (fn: (leadLine: Leadline) => void) => () => {
    const stub = new HUDGameObjectStub(({ resources, gameObjectAction }) => {
      const leadLine = new Leadline();
      fn(leadLine);
      return [leadLine.getObject3D()];
    });
    stub.start();
    return stub.domElement();
  };

export const tekitou = leadLineStory((leadLine: Leadline) => {
  // NOP
});