import { ArmdozerId } from "gbraver-burst-core";

import { Resources } from "../../../resource";
import { ArmdozerIcon } from "../armdozer-icon";
import { ROOT } from "../dom/class-name";
import { extractArmdozerIcons } from "../dom/extract-elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { SecretPlayerSelectProps } from "../props";

/** SecretPlayerSelectProps生成パラメータ */
export type CreateSecretPlayerSelectPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** 選択可能なアームドーザID */
  armdozerIds: ArmdozerId[];
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

  const { resources, armdozerIds } = params;
  const armdozerIconsContainer = extractArmdozerIcons(root);
  const armdozerIcons = armdozerIds.map(armdozerId => new ArmdozerIcon(resources, armdozerId));
  armdozerIcons.forEach(icon => {
    armdozerIconsContainer.appendChild(icon.getRootHTMLElement());
  });
  
  return { root };
}
