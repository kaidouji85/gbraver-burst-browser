import { MessageWindow } from "../../../../../game-dom/message-window";
import { MiniController } from "../../../../../game-dom/mini-controller";
import { BattleScenePropsCreatorParams } from "../../../procedure/create-battle-scene-props";
import { DOMLayerProps } from "../props";

/**
 * DOMLayerPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createDOMLayerProps(
  params: BattleScenePropsCreatorParams,
): DOMLayerProps {
  const { resources } = params;
  const rightMessageWindow = new MessageWindow({
    resources,
    type: "Right",
    facePosition: "Right",
    faceOrientation: "Left",
  });
  rightMessageWindow.visible(false);

  const leftMessageWindow = new MessageWindow({
    resources,
    type: "Left",
    facePosition: "Left",
    faceOrientation: "Right",
  });
  leftMessageWindow.visible(false);

  const nearBatterySelectorMessageWindow = new MessageWindow({
    resources,
    type: "NearBatterySelector",
    facePosition: "Left",
    faceOrientation: "Right",
  });
  nearBatterySelectorMessageWindow.visible(false);

  const nearBurstButtonMessageWindow = new MessageWindow({
    resources,
    type: "NearBurstButton",
    facePosition: "Right",
    faceOrientation: "Left",
  });
  nearBurstButtonMessageWindow.visible(false);

  const nearPilotButtonMessageWindow = new MessageWindow({
    resources,
    type: "NearPilotButton",
    facePosition: "Right",
    faceOrientation: "Left",
  });
  nearPilotButtonMessageWindow.visible(false);

  const playerShoutMessageWindow = new MessageWindow({
    resources,
    type: "PlayerShout",
    faceOrientation: "Left",
    facePosition: "Right",
  });
  playerShoutMessageWindow.visible(false);

  const enemyShoutMessageWindow = new MessageWindow({
    resources,
    type: "EnemyShout",
    faceOrientation: "Right",
    facePosition: "Left",
  });
  enemyShoutMessageWindow.visible(false);

  const miniController = new MiniController(params);
  return {
    rightMessageWindow,
    leftMessageWindow,
    nearBatterySelectorMessageWindow,
    nearBurstButtonMessageWindow,
    nearPilotButtonMessageWindow,
    playerShoutMessageWindow,
    enemyShoutMessageWindow,
    miniController,
  };
}
