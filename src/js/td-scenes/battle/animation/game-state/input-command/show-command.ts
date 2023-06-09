import { Command } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { canBurstButtonPush } from "../../../can-burst-button-push";
import { canPilotButtonPush } from "../../../can-pilot-button-push";
import { BattleControllerType } from "../../../controller-type";
import { getEnableMaxBattery } from "../../../get-enable-max-battery";
import { getInitialBattery } from "../../../get-initial-battery";
import { BattleSceneView } from "../../../view";
import { ButtonConfig } from "../../../../../game-dom/mini-controller/button-config";

/** アニメーションパラメータ */
type AnimationParam = {
  /** ビュー */
  view: BattleSceneView;
  /** プレイヤーターンか否か、trueでプレイヤーターン */
  isPlayerTurn: boolean;
  /** プレイヤーが選択可能なコマンド */
  commands: Command[];
  /** プレイヤーの最大バッテリー */
  maxBattery: number;
};

/**
 * アニメーションパラメータをミニコントローラボタン設定に変換する
 * @param origin 変換元
 * @return 変換結果
 */
function toMiniControllerConfig(origin: AnimationParam): ButtonConfig {
  const battery = getEnableMaxBattery(origin.commands);
  const canBurst = canBurstButtonPush(origin.commands);
  const canPilotSkill = canPilotButtonPush(origin.commands);
  return {
    battery,
    maxBattery: origin.maxBattery,
    canBurst,
    canPilotSkill,
  }
}

/**
 * ボタン表示アニメーション
 * @param param パラメータ
 * @return アニメーション
 */
function showButtons(param: Readonly<AnimationParam>): Animate {
  const enableMaxBattery = getEnableMaxBattery(param.commands);
  const initialValue = getInitialBattery(enableMaxBattery);
  const label = param.isPlayerTurn ? "Attack" : "Defense";
  const canBurst = canBurstButtonPush(param.commands);
  const canPilotSkill = canPilotButtonPush(param.commands);
  const miniControllerConfig = toMiniControllerConfig(param);
  param.view.dom.miniController.engage(miniControllerConfig);
  return all(
    param.view.hud.gameObjects.batterySelector.open({
      initialValue,
      maxBattery: param.maxBattery,
      enableMaxBattery,
      label,
    }),
    param.view.hud.gameObjects.burstButton.open(canBurst),
    param.view.hud.gameObjects.pilotButton.open(canPilotSkill)
  );
}

/**
 * ミニコントローラー表示アニメーション
 * @param param パラメータ
 * @return アニメーション
 */
function showMiniController(param: AnimationParam): Animate {
  const miniControllerConfig = toMiniControllerConfig(param);
  param.view.dom.miniController.engage(miniControllerConfig);
  return param.view.dom.miniController.show();
}

/** コマンド表示パラメータ */
export type ShowCommandParam = AnimationParam & {
  /** コントローラータイプ */
  controllerType: BattleControllerType;
};

/**
 * 各種コマンドを表示するヘルパー関数
 * controllerTypeに応じて、表示するものが変わる
 * @param param パラメータ
 * @return アニメーション
 */
export function showCommand(param: ShowCommandParam): Animate {
  switch (param.controllerType) {
    case "BigButton":
      return showButtons(param);
    case "MiniController":
      return showMiniController(param);
    default:
      return showButtons(param);
  }
}
