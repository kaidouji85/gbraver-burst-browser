import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { Resources } from "../../../resource";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { BLOCK } from "../dom/class-name";
import { extractArmdozerIcon, extractCaption } from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { StageTitleProps } from "../props";

/** StageTitleProps生成パラメータ */
export type CreateStageTitleParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ステージレベル */
  level: number;
  /** ステージ名 */
  caption: string[];
  /** 対戦するアームドーザのID */
  armdozerId: ArmdozerId;
};

/**
 * StageTitlePropsを生成する
 * @param params 生成パラメータ
 */
export function createStageTitleProps(
  params: CreateStageTitleParams,
): StageTitleProps {
  const root = document.createElement("div");
  root.className = BLOCK;
  root.innerHTML = rootInnerHTML(params.level);

  const armdozerIconPathID = getArmdozerIconPathId(params.armdozerId);
  const armdozerIcon = extractArmdozerIcon(root);
  armdozerIcon.src =
    params.resources.paths.find((v) => v.id === armdozerIconPathID)?.path ?? "";

  const caption = extractCaption(root);
  caption.innerHTML = params.caption
    .map(
      (v) => `
        <span class="${BLOCK}__caption-clause">
          ${v}
        </span>
      `,
    )
    .reduce((a, b) => a + b);

  return {
    root,
    isArmdozerIconLoaded: waitElementLoaded(armdozerIcon),
  };
}
