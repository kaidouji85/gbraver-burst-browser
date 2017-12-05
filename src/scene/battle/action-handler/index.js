// @flow

import type {Action} from "../../action";
import {BattleScene} from "../index";
import {BattleSceneView} from "../view";
import {gameLoop} from "./game-loop";
import {debugMode} from "./debug-mode";
import {resize} from "./resize";
import type {BattleSceneState} from "../state";

type Handler = (view: BattleSceneView, state: BattleSceneState) => void;
const emptyHandler = (view: BattleSceneView, state: BattleSceneState) => {};

export function actionHandler(action: Action, scene: BattleScene) {
  const handler: Handler = getHandler(action);
  handler(scene.view, scene.state);
}

function getHandler(action: Action): Handler {
  switch (action.type) {
    case 'gameLoop':
      return gameLoop;
    case 'resize':
      return resize;
    case 'debugMode':
      return debugMode;
    default:
      return emptyHandler;

  }
}