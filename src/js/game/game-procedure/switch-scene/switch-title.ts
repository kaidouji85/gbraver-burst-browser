import { map } from "rxjs";

import { Title } from "../../../dom-scenes/title";
import { GameProps } from "../../game-props";

/**
 * タイトル画面に切り替える
 * @param props ゲームプロパティ
 * @param scene タイトル画面
 */
export const switchTitle = (props: GameProps, scene: Title) =>
  props.domSceneBinder.bind(
    scene,
    props.gameAction.connect([
      scene.notifyLogin().pipe(map(() => ({ type: "UniversalLogin" }))),
      scene.notifyLogout().pipe(map(() => ({ type: "Logout" }))),
      scene
        .notifyAccountDeletion()
        .pipe(map(() => ({ type: "AccountDeleteConsent" }))),
      scene.notifyArcade().pipe(map(() => ({ type: "ArcadeStart" }))),
      scene.notifyNetBattle().pipe(map(() => ({ type: "NetBattleStart" }))),
      scene.notifyConfig().pipe(map(() => ({ type: "ConfigChangeStart" }))),
      scene.notifyTutorial().pipe(map(() => ({ type: "StoryStart" }))),
    ]),
  );
