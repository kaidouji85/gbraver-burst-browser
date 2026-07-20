import { BatterySelector } from "../../../../../../game-object/battery-selector";
import { DeathAlert } from "../../../../../../game-object/death-alert";
import {
  frontmostFader,
  rearmostFader,
} from "../../../../../../game-object/fader";
import {
  batterySelectorLeadLine,
  burstButtonLeadLine,
  pilotButtonLeadLine,
} from "../../../../../../game-object/lead-line";
import { drawIndicator } from "../../../../../../game-object/result-indicator";
import { TimeScaleButton } from "../../../../../../game-object/time-scale-button/time-scale-button";
import { HUDLayerObjectCreatorParams } from "../../creator-params";
import { HUDGameObjectsProps } from "../props";
import { createBurstButton } from "./create-burst-button";
import { createPilotButton } from "./create-pilot-button";

/**
 * HUDGameObjectsPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createHUDGameObjectsProps(
  params: HUDLayerObjectCreatorParams,
): HUDGameObjectsProps {
  const { resources, gameObjectAction, player } = params;
  return {
    batterySelector: new BatterySelector({
      ...params,
      armdozerId: player.armdozer.id,
    }),
    batterySelectorLeadLine: batterySelectorLeadLine(gameObjectAction),
    burstButton: createBurstButton(params),
    burstButtonLeadLine: burstButtonLeadLine(gameObjectAction),
    pilotButton: createPilotButton(params),
    pilotButtonLeadLine: pilotButtonLeadLine(gameObjectAction),
    timeScaleButton: new TimeScaleButton(params),
    frontmostFader: frontmostFader({ gameObjectAction, isVisible: false }),
    rearmostFader: rearmostFader({ gameObjectAction, isVisible: false }),
    deathAlertVignette: new DeathAlert(params),
    drawIndicator: drawIndicator(resources, gameObjectAction),
  };
}
