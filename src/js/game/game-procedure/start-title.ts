import { MAX_LOADING_TIME } from "../../dom-scenes/dom-scene-binder/max-loading-time";
import { Title } from "../../dom-scenes/title";
import {
  LoggedInAccount,
  TitleAccount,
} from "../../dom-scenes/title/title-account";
import { ResourcesContainer } from "../../resource";
import { PathIds } from "../../resource/path/ids";
import { waitTime } from "../../wait/wait-time";
import { GameProps } from "../game-props";
import { Online } from "../network-context/online";
import { switchTitle } from "./switch-scene/switch-title";

/**
 * ログイン済みアカウント情報を生成する
 * @param options 各種オプション
 * @returns 生成結果
 */
const createLoggedInAccount = async (
  options: ResourcesContainer & {
    /** ネットワークコンテキスト（オンライン） */
    networkContext: Online;
  },
): Promise<LoggedInAccount> => {
  const { resources, networkContext } = options;
  const [name, pictureURL] = await Promise.all([
    networkContext.sdk.getUserName(),
    networkContext.sdk.getUserPictureURL(),
  ]);
  const defaultUserIcon =
    resources.paths.find((p) => p.id === PathIds.DEFAULT_USER_ICON)?.path ?? "";
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
  const { networkContext } = props;
  const account: TitleAccount =
    networkContext.type === "online" && (await networkContext.sdk.isLogin())
      ? await createLoggedInAccount({ ...props, networkContext })
      : { type: "GuestAccount" };
  const isAPIServerEnable = networkContext.type !== "stand-alone";
  const scene = new Title({
    ...props,
    account,
    isAPIServerEnable,
  });
  switchTitle(props, scene);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}
