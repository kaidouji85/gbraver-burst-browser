import { GameProps } from "../game-props";

/**
 * body要素にゲーム全体で利用するHTML要素を追加する
 * @param props ゲームプロパティ
 */
export function appendChildrenToBody(props: Readonly<GameProps>): void {
  const body = document.body || document.createElement("div");
  const elements = [
    props.fader.getRootHTMLElement(),
    props.interruptScenes.getRootHTMLElement(),
    props.domDialogBinder.getRootHTMLElement(),
    props.domSceneBinder.getRootHTMLElement(),
    props.domFloaters.getRootHTMLElement(),
    props.renderer.getRendererDOM(),
    ...props.tdSceneBinder.getDOMLayerElements(),
  ];
  elements.forEach((element) => {
    body.appendChild(element);
  });
}
