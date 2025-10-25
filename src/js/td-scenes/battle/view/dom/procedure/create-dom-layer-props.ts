import { BattleHamburgerMenu } from "../../../../../game-dom/battle-hamburger-menu";
import { MessageWindow } from "../../../../../game-dom/message-window";
import { MiniController } from "../../../../../game-dom/mini-controller";
import { BattleViewCreatorParams } from "../../creator-params";
import { DOMLayerProps } from "../props";

/**
 * DOMLayerPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createDOMLayerProps(
  params: BattleViewCreatorParams,
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

  const nearEnemyBattleSimulatorButtonMessageWindow = new MessageWindow({
    resources,
    type: "NearEnemyBattleSimulatorButton",
    facePosition: "Right",
    faceOrientation: "Left",
  });
  nearEnemyBattleSimulatorButtonMessageWindow.visible(true); // TODO 開発が完了したらfalseに変更する

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

  const hamburgerMenu = new BattleHamburgerMenu(params);

  const miniController = new MiniController(params);
  return {
    rightMessageWindow,
    leftMessageWindow,
    nearBatterySelectorMessageWindow,
    nearBurstButtonMessageWindow,
    nearPilotButtonMessageWindow,
    nearEnemyBattleSimulatorButtonMessageWindow,
    playerShoutMessageWindow,
    enemyShoutMessageWindow,

    hamburgerMenu,

    miniController,
  };
}
