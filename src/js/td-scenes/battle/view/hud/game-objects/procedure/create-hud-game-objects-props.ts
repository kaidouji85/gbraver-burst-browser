import { BatterySelector } from "../../../../../../game-object/battery-selector";
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
import { HorizontalAnimationMesh } from "../../../../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../../../../resource";
import { findTextureOrThrow } from "../../../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../../../resource/texture/ids";
import { HUDLayerObjectCreatorParams } from "../../creator-params";
import { HUDGameObjectsProps } from "../props";
import { createBurstButton } from "./create-burst-button";
import { createPilotButton } from "./create-pilot-button";

/**
 * シンブレイバー攻撃アイコンを生成する
 * @param options オプション
 * @returns 生成結果
 */
const shinBraverAttackIcon = (options: ResourcesContainer) => {
  const { resources } = options;
  const texture = findTextureOrThrow(
    resources,
    TEXTURE_IDS.SHIN_BRAVER_SP_ATTACK,
  ).texture;
  const mesh = new HorizontalAnimationMesh({
    texture,
    maxAnimation: 4,
    width: 600,
    height: 600,
  });
  const position = { x: 0, y: 0 };
  mesh.animate(1);
  return { mesh, position };
};

/**
 * HUDGameObjectsPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createHUDGameObjectsProps(
  params: HUDLayerObjectCreatorParams,
): HUDGameObjectsProps {
  const { resources, gameObjectAction } = params;
  // TODO アームドーザごとに出し分ける
  const attackIcon = shinBraverAttackIcon({ resources });
  return {
    batterySelector: new BatterySelector({ ...params, attackIcon }),
    batterySelectorLeadLine: batterySelectorLeadLine(gameObjectAction),
    burstButton: createBurstButton(params),
    burstButtonLeadLine: burstButtonLeadLine(gameObjectAction),
    pilotButton: createPilotButton(params),
    pilotButtonLeadLine: pilotButtonLeadLine(gameObjectAction),
    timeScaleButton: new TimeScaleButton(params),
    frontmostFader: frontmostFader({
      gameObjectAction: gameObjectAction,
      isVisible: false,
    }),
    rearmostFader: rearmostFader({
      gameObjectAction: gameObjectAction,
      isVisible: false,
    }),
    drawIndicator: drawIndicator(resources, gameObjectAction),
  };
}
