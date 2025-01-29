import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT_HIDDEN } from "../dom/class-name";
import {
  extractBackGround,
  extractBattleSimulator,
  extractEndBattleButton,
  extractEndBattleCancelButton,
  extractEndBattleConfirmDialog,
  extractEndBattleConfirmDialogCloser,
  extractHamburgerIcon,
  extractMenu,
  extractRetryButton,
  extractRetryCancelButton,
  extractRetryConfirmDialog,
  extractRetryConfirmDialogCloser,
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

  const battleSimulator = extractBattleSimulator(root);

  const retryConfirmDialog = extractRetryConfirmDialog(root);
  const retryConfirmDialogCloser = extractRetryConfirmDialogCloser(root);
  const retryButton = extractRetryButton(root);
  const retryCancelButton = extractRetryCancelButton(root);

  const endBattleConfirmDialog = extractEndBattleConfirmDialog(root);
  const endBattleConfirmDialogCloser =
    extractEndBattleConfirmDialogCloser(root);
  const endBattleButton = extractEndBattleButton(root);
  const endBattleCancelButton = extractEndBattleCancelButton(root);

  const changeValueSound =
    params.resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();
  const decideSound =
    params.resources.sounds.find((s) => s.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();

  const exclusive = new Exclusive();

  const battleSimulatorStartNotifier = new Subject<void>();
  const retryNotifier = new Subject<void>();
  const endBattleNotifier = new Subject<void>();

  return {
    ...params,

    canBattleSimulatorStart: false,

    root,
    hamburgerIcon,
    menu,
    background,
    battleSimulator,

    retryConfirmDialog,
    retryConfirmDialogCloser,
    retryButton,
    retryCancelButton,

    endBattleConfirmDialog,
    endBattleConfirmDialogCloser,
    endBattleButton,
    endBattleCancelButton,

    changeValueSound,
    decideSound,

    exclusive,

    battleSimulatorStartNotifier,
    retryNotifier,
    endBattleNotifier,
  };
}
