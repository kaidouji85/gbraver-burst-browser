import { Command } from "gbraver-burst-core";
import { BattleSceneView } from "../../../view";
import { Animate } from "../../../../../animation/animate";
import { getEnableMaxBattery } from "../../../get-enable-max-battery";
import { getInitialBattery } from "../../../get-initial-battery";
import { canBurstButtonPush } from "../../../can-burst-button-push";
import { canPilotButtonPush } from "../../../can-pilot-button-push";
import { all } from "../../../../../animation/all";
import { BattleControllerType } from "../../../controller-type";

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
 * ボタン表示アニメーション
 * @param param パラメータ
 * @return アニメーション
 */
function showButtons(param: Readonly<AnimationParam>): Animate {
  const enableMaxBattery = getEnableMaxBattery(param.commands);
  const initialBattery = getInitialBattery(enableMaxBattery);
  const okButtonLabel = param.isPlayerTurn ? "Attack" : "Defense";
  const canBurst = canBurstButtonPush(param.commands);
  const canPilotSkill = canPilotButtonPush(param.commands);
  return all(
    param.view.hud.gameObjects.batterySelector.open(
      initialBattery,
      param.maxBattery,
      enableMaxBattery,
      okButtonLabel
    ),
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
  const battery = getEnableMaxBattery(param.commands);
  const canBurst = canBurstButtonPush(param.commands);
  const canPilotSkill = canPilotButtonPush(param.commands);
  return param.view.dom.miniController.show({
    battery,
    maxBattery: param.maxBattery,
    canBurst,
    canPilotSkill,
  });
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
  switch(param.controllerType) {
    case "BigButton":
      return showButtons(param);
    case "MiniController":
      return showMiniController(param);
    default:
      return showButtons(param);  
  }
}
