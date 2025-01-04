import {DataIDs} from "../dom/data-ids";
import {domUuid} from "../../../uuid/dom-uuid";
import {rootInnerHTML, RootInnerHTMLParams} from "../dom/root-inner-html";
import {ROOT_CLASS} from "../dom/class-name";
import {extractElements} from "../dom/elements";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import {PathIds} from "../../../resource/path/ids";
import {Exclusive} from "../../../exclusive/exclusive";
import {SOUND_IDS} from "../../../resource/sound/ids";
import {createEmptySoundResource} from "../../../resource/sound/empty-sound-resource";
import {Subject} from "rxjs";
import {ResourcesContainer} from "../../../resource";
import {SEPlayerContainer} from "../../../se/se-player";
import {TitleProps} from "../props";

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
  const dataIDs: DataIDs = {
    login: domUuid(),
    accountMenu: domUuid(),
    avatar: domUuid(),
    helpIcon: domUuid(),
    helpMenu: domUuid(),
    deleteAccount: domUuid(),
    logout: domUuid(),
    logo: domUuid(),
    story: domUuid(),
    tutorial: domUuid(),
    arcade: domUuid(),
    netBattle: domUuid(),
    config: domUuid(),
  };
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(dataIDs, params);
  root.className = ROOT_CLASS;
  const elements = extractElements(root, dataIDs);
  const avatar = elements.avatar;
  const isAvatarLoaded =
    params.account.type === "LoggedInAccount"
      ? waitElementLoaded(avatar)
      : Promise.resolve();
  avatar.src =
    params.account.type === "LoggedInAccount" ? params.account.pictureURL : "";
  const isLogoLoaded = waitElementLoaded(elements.logo);
  elements.logo.src =
    params.resources.paths.find((v) => v.id === PathIds.LOGO)?.path ?? "";
  const titleBackImage = new Image();
  const isTitleBackLoaded = waitElementLoaded(titleBackImage).then(() => {
    root.style.backgroundImage = `url(${titleBackImage.src})`;
  });
  titleBackImage.src =
    params.resources.paths.find((v) => v.id === PathIds.TITLE_BACK)?.path ?? "";
  const isHelpIconLoaded = waitElementLoaded(elements.helpIcon);
  elements.helpIcon.src =
    params.resources.paths.find((v) => v.id === PathIds.HELP_ICON)?.path ?? "";
  return {
    ...params,
    ...elements,
    exclusive: new Exclusive(),
    root,
    avatar,
    isLogoLoaded,
    isAvatarLoaded,
    isTitleBackLoaded,
    isHelpIconLoaded,
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