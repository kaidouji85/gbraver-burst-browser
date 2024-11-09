import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT_HIDDEN } from "../dom/class-name";
import {
  extractBackGround,
  extractHamburgerIcon,
  extractMenu,
  extractRetryConfirmDialog,
} from "../dom/extract-element";
import { rootInnerHTML, RootInnerHTMLParams } from "../dom/root-inner-html";
import { BattleHamburgerMenuProps } from "../props";

/** BattleHamburgerMenuProps生成パラメーター */
export type BattleHamburgerMenuPropsCreatorParams = RootInnerHTMLParams &
  SEPlayerContainer;

/**
 * BattleHamburgerMenuPropsを生成する
 * @param params 生成パラメーター
 * @returns 生成結果
 */
export function createBattleHamburgerMenuProps(
  params: BattleHamburgerMenuPropsCreatorParams,
): BattleHamburgerMenuProps {
  const root = document.createElement("div");
  root.className = ROOT_HIDDEN;
  root.innerHTML = rootInnerHTML(params);

  const hamburgerIcon = extractHamburgerIcon(root);
  const menu = extractMenu(root);

  const background = extractBackGround(root);
  const retryConfirmDialog = extractRetryConfirmDialog(root);

  const changeValueSound =
    params.resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();

  return {
    ...params,
    root,
    hamburgerIcon,
    menu,

    background,
    retryConfirmDialog,

    changeValueSound,
  };
}
