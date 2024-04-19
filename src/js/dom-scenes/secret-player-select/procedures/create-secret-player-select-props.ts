import { ArmdozerId, PilotId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayer } from "../../../se/se-player";
import { ArmdozerIcon } from "../armdozer-icon";
import { ROOT } from "../dom/class-name";
import {
  extractArmdozerIconContainer,
  extractArmdozerSelectionDetail,
  extractArmdozerSelectionIndicator,
  extractOKButton,
  extractPilotIconContainer,
  extractPilotSelectionDetail,
  extractPilotSelectionIndicator,
  extractPrevButton,
} from "../dom/extract-elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PilotIcon } from "../pilot-icon";
import { SecretPlayerSelectProps } from "../props";

/** SecretPlayerSelectProps生成パラメータ */
export type CreateSecretPlayerSelectPropsParams = ResourcesContainer & {
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** 選択可能なアームドーザID */
  armdozerIds: ArmdozerId[];
  /** 選択可能なパイロットID */
  pilotIds: PilotId[];
};

/**
 * SecretPlayerSelectPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createSecretPlayerSelectProps(
  params: CreateSecretPlayerSelectPropsParams,
): SecretPlayerSelectProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();

  const { resources, armdozerIds, pilotIds } = params;
  const armdozerIconContainer = extractArmdozerIconContainer(root);
  const armdozerIcons = armdozerIds.map(
    (armdozerId) => new ArmdozerIcon(resources, armdozerId),
  );
  armdozerIcons.forEach((icon) => {
    armdozerIconContainer.appendChild(icon.getRootHTMLElement());
  });

  const pilotIconContainer = extractPilotIconContainer(root);
  const pilotIcons = pilotIds.map((id) => new PilotIcon(resources, id));
  pilotIcons.forEach((icon) => {
    pilotIconContainer.appendChild(icon.getRootHTMLElement());
  });

  return {
    ...params,
    root,
    armdozerSelectionIndicator: extractArmdozerSelectionIndicator(root),
    armdozerSelectionDetail: extractArmdozerSelectionDetail(root),
    pilotSelectionIndicator: extractPilotSelectionIndicator(root),
    pilotSelectionDetail: extractPilotSelectionDetail(root),
    okButton: extractOKButton(root),
    prevButton: extractPrevButton(root),

    exclusive: new Exclusive(),

    armdozerIcons,
    armdozerSelection: { type: "ArmdozerUnselected" },

    pilotIcons,
    pilotSelection: { type: "PilotUnselected" },

    pushButtonSound:
      resources.sounds.find((s) => s.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    changeValueSound:
      resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),

    ok: new Subject(),
    prev: new Subject(),
  };
}
