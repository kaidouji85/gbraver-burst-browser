import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { ROOT_CLASS } from "../dom/class-name";
import {
  extractAccountMenu,
  extractArcade,
  extractAvatar,
  extractConfig,
  extractDeleteAccount,
  extractGenesisBraver,
  extractGranDozer,
  extractHelpIcon,
  extractHelpMenu,
  extractLogin,
  extractLogo,
  extractLogout,
  extractNetBattle,
  extractShinBraver,
  extractStory,
  extractTutorial,
  extractWingDozer,
} from "../dom/extract-elements";
import { rootInnerHTML, RootInnerHTMLParams } from "../dom/root-inner-html";
import { TitleProps } from "../props";

/** タイトル画面プロパティ生成パラメータ */
export type CreateTitlePropsParams = RootInnerHTMLParams &
  ResourcesContainer &
  SEPlayerContainer;

/**
 * タイトル画面プロパティを生成する
 *
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createTitleProps(params: CreateTitlePropsParams): TitleProps {
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(params);
  root.className = ROOT_CLASS;

  const avatar = extractAvatar(root);

  const isAvatarLoaded =
    params.account.type === "LoggedInAccount"
      ? waitElementLoaded(avatar)
      : Promise.resolve();
  avatar.src =
    params.account.type === "LoggedInAccount" ? params.account.pictureURL : "";

  const logo = extractLogo(root);
  const isLogoLoaded = waitElementLoaded(logo);
  logo.src =
    params.resources.paths.find((v) => v.id === PathIds.LOGO)?.path ?? "";

  const helpIcon = extractHelpIcon(root);
  const isHelpIconLoaded = waitElementLoaded(helpIcon);
  helpIcon.src =
    params.resources.paths.find((v) => v.id === PathIds.HELP_ICON)?.path ?? "";

  const genesisBraver = extractGenesisBraver(root);
  const isGenesisBraverLoaded = waitElementLoaded(genesisBraver);

  const shinBraver = extractShinBraver(root);
  const isShinBraverLoaded = waitElementLoaded(shinBraver);

  const granDozer = extractGranDozer(root);
  const isGranDozerLoaded = waitElementLoaded(granDozer);

  const wingDozer = extractWingDozer(root);
  const isWingDozerLoaded = waitElementLoaded(wingDozer);

  const isImgLoaded = Promise.all([
    isLogoLoaded,
    isHelpIconLoaded,
    isAvatarLoaded,
    isGenesisBraverLoaded,
    isShinBraverLoaded,
    isGranDozerLoaded,
    isWingDozerLoaded,
  ]);
  return {
    ...params,
    exclusive: new Exclusive(),

    root,
    login: extractLogin(root),
    accountMenu: extractAccountMenu(root),
    avatar,
    deleteAccount: extractDeleteAccount(root),
    logout: extractLogout(root),
    helpIcon,
    helpMenu: extractHelpMenu(root),
    tutorial: extractTutorial(root),
    story: extractStory(root),
    arcade: extractArcade(root),
    netBattle: extractNetBattle(root),
    config: extractConfig(root),

    isImgLoaded,

    pushButton:
      params.resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    changeValue:
      params.resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    pushLogin: new Subject(),
    pushDeleteAccount: new Subject(),
    pushLogout: new Subject(),
    pushTutorial: new Subject(),
    pushStory: new Subject(),
    pushArcade: new Subject(),
    pushNetBattle: new Subject(),
    pushConfig: new Subject(),
  };
}
