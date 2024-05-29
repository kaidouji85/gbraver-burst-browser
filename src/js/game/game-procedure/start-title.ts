import { Title } from "../../dom-scenes/title";
import {
  LoggedInAccount,
  TitleAccount,
} from "../../dom-scenes/title/title-account";
import { waitTime } from "../../wait/wait-time";
import { titleConnector } from "../action-connector/title-connector";
import { MAX_LOADING_TIME } from "../../dom-scenes/dom-scene-binder/max-loading-time";
import type { GameProps } from "../game-props";

/**
 * タイトル画面を開始するヘルパー関数
 * いかなる場合でもaccount、canCasualMatch、termsOfServiceURL、privacyPolicyURL
 * に同じ値をセットするために、ヘルパーメソッド化した
 *
 * @param props ゲームプロパティ
 * @returns 開始したタイトル画面
 */
export async function startTitle(props: Readonly<GameProps>): Promise<Title> {
  const createLoggedInAccount = async (): Promise<LoggedInAccount> => {
    const [name, pictureURL] = await Promise.all([
      props.api.getUserName(),
      props.api.getUserPictureURL(),
    ]);
    return {
      type: "LoggedInAccount",
      name,
      pictureURL,
    };
  };

  const isLogin = await props.api.isLogin();
  const account: TitleAccount = isLogin
    ? await createLoggedInAccount()
    : {
        type: "GuestAccount",
      };
  const scene = new Title({
    ...props,
    account,
  });
  props.domSceneBinder.bind(scene, titleConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}
