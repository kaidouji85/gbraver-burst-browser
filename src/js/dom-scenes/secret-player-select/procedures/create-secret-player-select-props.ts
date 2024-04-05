import { ArmdozerId, PilotId } from "gbraver-burst-core";

import { Resources } from "../../../resource";
import { ArmdozerIcon } from "../armdozer-icon";
import { ROOT } from "../dom/class-name";
import {
  extractArmdozerIconContainer as extractArmdozerCardContainer,
  extractPilotIconContainer,
} from "../dom/extract-elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PilotIcon } from "../pilot-icon";
import { SecretPlayerSelectProps } from "../props";

/** SecretPlayerSelectProps生成パラメータ */
export type CreateSecretPlayerSelectPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
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
  const armdozerIconContainer = extractArmdozerCardContainer(root);
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

  return { root };
}
