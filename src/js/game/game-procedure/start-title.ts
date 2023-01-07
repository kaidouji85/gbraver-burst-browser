import { $ReadOnly } from "utility-types";
import { Title } from "../../dom-scenes/title";
import { waitTime } from "../../wait/wait-time";
import { titleConnector } from "../action-connector/title-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import type { GameProps } from "../game-props";

/**
 * タイトル画面を開始するヘルパー関数
 * いかなる場合でもaccount、canCasualMatch、termsOfServiceURL、privacyPolicyURL
 * に同じ値をセットするために、ヘルパーメソッド化した
 *
 * @param props ゲームプロパティ
 * @return 開始したタイトル画面
 */
export async function startTitle(props: $ReadOnly<GameProps>): Promise<Title> {
  const createLoggedInAccount = async () => {
    const [name, pictureURL] = await Promise.all([props.api.getUserName(), props.api.getUserPictureURL()]);
    return {
      type: "LoggedInAccount",
      name,
      pictureURL
    };
  };

  const isLogin = await props.api.isLogin();
  const account = isLogin ? await createLoggedInAccount() : {
    type: "GuestAccount"
  };
  const scene = new Title({
    resources: props.resources,
    account,
    howToPlayURL: props.howToPlayURL,
    isApiServerEnable: props.isAPIServerEnable,
    termsOfServiceURL: props.termsOfServiceURL,
    privacyPolicyURL: props.privacyPolicyURL,
    contactURL: props.contactURL
  });
  props.domSceneBinder.bind(scene, titleConnector);
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}