import { PilotId } from "gbraver-burst-core";
import { Howl } from "howler";
import { Subject } from "rxjs";

import { replaceDOM } from "../../../../dom/replace-dom";
import { Exclusive } from "../../../../exclusive/exclusive";
import { Resources } from "../../../../resource";
import { SOUND_IDS } from "../../../../resource/sound";
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

/**
 * PilotSelectorPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param pilotIds 選択可能なパイロットIDリスト
 * @param initialPilotId パイロットIDの初期値
 * @return 生成結果
 */
export function createPilotSelectorProps(
  resources: Resources,
  pilotIds: PilotId[],
  initialPilotId: PilotId,
): PilotSelectorProps {
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
    pilotId: initialPilotId,
    exclusive: new Exclusive(),
    root,
    pilotStatus,
    pilotIcons,
    okButton: extractOkButton(root),
    prevButton: extractPrevButton(root),
    changeValueSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
      new Howl({ src: "" }),
    decideSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
      new Howl({ src: "" }),
    change: new Subject(),
    decide: new Subject(),
    prev: new Subject(),
  };
}
