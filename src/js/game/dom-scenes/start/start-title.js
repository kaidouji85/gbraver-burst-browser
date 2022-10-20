// @flow
import { waitTime } from "../../../wait/wait-time";
import { bindScene } from "../bind-scene";
import { discardCurrentScene } from "../discard-current-scene";
import { MAX_LOADING_TIME } from "../max-loading-time";
import type { DOMScenesProps } from "../props";
import type { TitleParams } from "../scene/title";
import { Title } from "../scene/title";

/**
 * 新しくタイトル画面を開始する
 *
 * @param props DOMScenesプロパティ
 * @param params タイトル画面コンストラクタパラメータ
 * @return 開始されたタイトル画面
 */
export async function startTitle(
  props: DOMScenesProps,
  params: TitleParams
): Promise<Title> {
  discardCurrentScene(props);
  const scene = new Title(params);
  bindScene(props, scene);
  props.unsubscribers = [
    scene.pushLoginNotifier().subscribe(() => {
      props.gameAction.next({ type: "UniversalLogin" });
    }),
    scene.pushLogoutNotifier().subscribe(() => {
      props.gameAction.next({ type: "Logout" });
    }),
    scene.pushDeleteAccountNotifier().subscribe(() => {
      props.gameAction.next({ type: "AccountDeleteConsent" });
    }),
    scene.pushArcadeNotifier().subscribe(() => {
      props.gameAction.next({ type: "ArcadeStart" });
    }),
    scene.pushHowToPlayNotifier().subscribe(() => {
      props.gameAction.next({ type: "ShowHowToPlay" });
    }),
    scene.pushCasualMatchNotifier().subscribe(() => {
      props.gameAction.next({ type: "CasualMatchStart" });
    }),
    scene.pushConfigNotifier().subscribe(() => {
      props.gameAction.next({ type: "ConfigChangeStart" });
    }),
    scene.pushTutorialNotifier().subscribe(() => {
      props.gameAction.next({ type: "TutorialStart" });
    }),
  ];
  await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
  return scene;
}
