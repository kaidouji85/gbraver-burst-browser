// @flow
import {Title} from "../dom-scenes/title/title";
import type {GameProps} from "../game-props";

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
    const [name, pictureURL] = await Promise.all([
      props.api.getUserName(),
      props.api.getUserPictureURL(),
    ]);
    return {type: 'LoggedInAccount', name, pictureURL};
  }

  const isLogin = await props.api.isLogin();
  const account = isLogin ? await createLoggedInAccount() : {type: 'GuestAccount'};
  return props.domScenes.startTitle(props.resources, props.bgm, account, props.isAPIServerEnable,
    props.termsOfServiceURL, props.privacyPolicyURL, props.contactURL);
}