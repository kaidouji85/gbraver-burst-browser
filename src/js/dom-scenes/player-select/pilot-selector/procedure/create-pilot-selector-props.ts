import { PilotId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { replaceDOM } from "../../../../dom/replace-dom";
import { Exclusive } from "../../../../exclusive/exclusive";
import { ResourcesContainer } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../../se/se-player";
import { BLOCK } from "../dom/class-name";
import {
  extractDummyStatus,
  extractIcons,
  extractOkButton,
  extractPrevButton,
} from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PilotIcon } from "../pilot-icon";
import { PilotStatus } from "../pilot-status";
import { PilotSelectorProps } from "../props";

/** PilotSelectorProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &  SEPlayerContainer & {
  /** 選択可能なパイロットIDリスト */
  pilotIds: PilotId[];
  /** パイロットIDの初期値 */
  initialPilotId: PilotId;
};

/**
 * PilotSelectorPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createPilotSelectorProps(
  params: PropsCreatorParams,
): PilotSelectorProps {
  const { resources, pilotIds, initialPilotId } = params;
  const root = document.createElement("div");
  root.className = BLOCK;
  root.innerHTML = rootInnerHTML();

  const pilotStatus = new PilotStatus();
  pilotStatus.switch(initialPilotId);
  const dummyStatus = extractDummyStatus(root);
  replaceDOM(dummyStatus, pilotStatus.getRootHTMLElement());

  const pilotIcons = pilotIds.map((id) => new PilotIcon(resources, id));
  const icons = extractIcons(root);
  pilotIcons.forEach((icon) => {
    icon.selected(icon.pilotId === initialPilotId);
    icons.appendChild(icon.getRootHTMLElement());
  });

  return {
    ...params,
    pilotId: initialPilotId,
    exclusive: new Exclusive(),
    root,
    pilotStatus,
    pilotIcons,
    okButton: extractOkButton(root),
    prevButton: extractPrevButton(root),
    changeValueSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    decideSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    change: new Subject(),
    decide: new Subject(),
    prev: new Subject(),
  };
}
