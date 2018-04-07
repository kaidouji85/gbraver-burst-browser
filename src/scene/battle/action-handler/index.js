// @flow

import type {Action} from "../../action";
import {BattleScene} from "../index";
import {gameLoop} from "./game-loop";
import {debugMode} from "./debug-mode";
import {resize} from "./resize";
import {mouseDown} from "./mouse-down";
import {mouseUp} from "./mouse-up";
import {touchStart} from "./touch-start";
import {touchEnd} from "./touch-end";
import {pushAttackButton} from "./push-attack-button";
import {mouseMove} from "./mouse-move";
import {mouseLeave} from "./mouse-leave";
import {touchMove} from "./touch-move";

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
    case 'mouseMove':
      return mouseMove(scene.view, scene.state, action);
    case 'mouseUp':
      return mouseUp(scene.view, scene.state, action);
    case 'mouseLeave':
      return mouseLeave(scene.view, scene.state, action);
    case 'touchStart':
      return touchStart(scene.view, scene.state, action);
    case 'touchMove':
      return touchMove(scene.view, scene.state, action);
    case 'touchEnd':
      return touchEnd(scene.view, scene.state, action);
    case 'pushAttackButton':
      return pushAttackButton(scene.view, scene.state, action);
    default:
      return;
  }
}