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
  (
    generator: () => Leadline,
    fn: (leadLine: Leadline) => void
  ) => () => {
    const stub = new HUDGameObjectStub(() => {
      const leadLine = generator();
      fn(leadLine);
      return [leadLine.getObject3D()];
    });
    stub.start();
    return stub.domElement();
  };

/** 青線 */
const blueLine = () => new Leadline();

/** 斜め線 */
export const diagonalLine = leadLineStory(blueLine, (leadLine: Leadline) => {
  leadLine.set({x: 0, y: 0}, {x: 100, y: 100});
});
