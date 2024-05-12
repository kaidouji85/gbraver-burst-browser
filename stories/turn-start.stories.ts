import { StoryFn } from "@storybook/html";
import { Observable } from "rxjs";

import { delay } from "../src/js/animation/delay";
import { GameObjectAction } from "../src/js/game-object/action/game-object-action";
import {
  enemyTurnStart,
  playerTurnStart,
} from "../src/js/game-object/turn-start";
import { TurnStart } from "../src/js/game-object/turn-start/turn-start";
import { Resources } from "../src/js/resource";
import { hudGameObjectStory } from "./stub/hud-game-object-stub";

export default {
  title: "TurnStart",
};

/**
 * ターンスタートのストーリー
 * @param generator ターンスタート生成関数
 * @param fn ターンスタート操作関数
 * @returns story
 */
const turnStartStory = (
  generator: (
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) => TurnStart,
  fn: (turnStart: TurnStart) => void,
) =>
  hudGameObjectStory(({ resources, gameObjectAction }) => {
    const turnStart = generator(resources, gameObjectAction);
    fn(turnStart);
    return [turnStart.getObject3D()];
  });

/**
 * ポップアップ
 * @param turnStart ターンスタート
 */
const popUp = (turnStart: TurnStart) => {
  delay(1000)
    .chain(turnStart.show())
    .chain(delay(2000))
    .chain(turnStart.hidden())
    .loop();
};

/** プレイヤー ターンスタート ポップアップ */
export const playerPopUp: StoryFn = turnStartStory(playerTurnStart, popUp);

/** 敵 ターンスタート ポップアップ */
export const enemyPopUp: StoryFn = turnStartStory(enemyTurnStart, popUp);
