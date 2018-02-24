// @flow

import type {Action} from "../../action";
import {BattleScene} from "../index";
import {gameLoop} from "./game-loop";
import {debugMode} from "./debug-mode";
import {resize} from "./resize";
import {mouseDown} from "./mouse-down";
import {mouseUp} from "./mouse-up";

/** アクションハンドラ */
export function actionHandler(action: Action, scene: BattleScene) {
  switch (action.type) {
    case 'gameLoop':
      return gameLoop(scene.view, scene.state, action);
    case 'resize':
      return resize(scene.view, scene.state, action);
    case 'debugMode':
      return debugMode(scene.view, scene.state, action);
    case 'mouseDown':
      return mouseDown(scene.view, scene.state, action);
    case 'mouseUp':
      return mouseUp(scene.view, scene.state, action);
    default:
      return;
  }
}