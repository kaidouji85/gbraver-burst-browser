import { ArmdozerId } from "gbraver-burst-core";
import { Howl } from "howler";
import { Subject } from "rxjs";

import { replaceDOM } from "../../../../dom/replace-dom";
import { Exclusive } from "../../../../exclusive/exclusive";
import { Resources } from "../../../../resource";
import { SOUND_IDS } from "../../../../resource/sound";
import { ArmdozerStatus } from "../armdozer-status";
import { createArmdozerIcon } from "../create-armdozer-icon";
import { BLOCK } from "../dom/class-name";
import {
  extractDummyStatus,
  extractIcons,
  extractOkButton,
  extractPrevButton,
} from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { ArmdozerSelectorProps } from "../props";

/**
 * ArmdozerSelectorPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param armdozerIds 選択可能なアームドーザIDリスト
 * @param initialArmdozerId 最初に選択しているアームドーザID
 * @return 生成結果
 */
export function createArmdozerSelectorProps(
  resources: Resources,
  armdozerIds: ArmdozerId[],
  initialArmdozerId: ArmdozerId,
): ArmdozerSelectorProps {
  const root = document.createElement("div");
  root.className = BLOCK;
  root.innerHTML = rootInnerHTML();

  const armdozerStatus = new ArmdozerStatus(resources);
  armdozerStatus.switch(initialArmdozerId);
  const dummyStatus = extractDummyStatus(root);
  replaceDOM(dummyStatus, armdozerStatus.getRootHTMLElement());

  const armdozerIcons = armdozerIds.map((id) =>
    createArmdozerIcon(resources, id),
  );
  const icons = extractIcons(root);
  armdozerIcons.forEach((icon) => {
    icon.selected(icon.armdozerId === initialArmdozerId);
    icons.appendChild(icon.getRootHTMLElement());
  });
  return {
    armdozerId: initialArmdozerId,
    exclusive: new Exclusive(),
    root,
    armdozerStatus,
    armdozerIcons,
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
