import { MAX_LOADING_TIME } from "../../dom-scenes/dom-scene-binder/max-loading-time";
import { Title } from "../../dom-scenes/title";
import {
  LoggedInAccount,
  TitleAccount,
} from "../../dom-scenes/title/title-account";
import { PathIds } from "../../resource/path/ids";
import { waitTime } from "../../wait/wait-time";
import { GameProps } from "../game-props";
import { switchTitle } from "./switch-scene/switch-title";

/**
 * ログイン済みアカウント情報を生成する
 * @param props ゲームプロパティ
 * @returns 生成結果
 */
const createLoggedInAccount = async (
  props: Readonly<GameProps>,
): Promise<LoggedInAccount> => {
  const [name, pictureURL] = await Promise.all([
    props.api.getUserName(),
    props.api.getUserPictureURL(),
  ]);
  const defaultUserIcon =
    props.resources.paths.find((p) => p.id === PathIds.DEFAULT_USER_ICON)
      ?.path ?? "";
  return {
    type: "LoggedInAccount",
    name,
    pictureURL: pictureURL ?? defaultUserIcon,
  };
};

/**
 * タイトル画面を開始するヘルパー関数
 * いかなる場合でもaccount、canCasualMatch、termsOfServiceURL、privacyPolicyURL
 * に同じ値をセットするために、ヘルパーメソッド化した
 * @param props ゲームプロパティ
 * @returns 開始したタイトル画面
 */
export async function startTitle(props: Readonly<GameProps>): Promise<Title> {
  const isLogin = await props.api.isLogin();
  const account: TitleAccount = isLogin
    ? await createLoggedInAccount(props)
    : { type: "GuestAccount" };
  const scene = new Title({
    ...props,
    account,
  });
  switchTitle(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}
