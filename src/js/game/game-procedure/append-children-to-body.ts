import { GameProps } from "../game-props";

/**
 * body要素に各種要素を追加する
 * @param props ゲームプロパティ
 */
export function appendChildToBody(props: Readonly<GameProps>): void {
  const body = document.body || document.createElement("div");
  const elements = [
    props.fader.getRootHTMLElement(),
    props.interruptScenes.getRootHTMLElement(),
    props.domDialogBinder.getRootHTMLElement(),
    props.domSceneBinder.getRootHTMLElement(),
    props.domFloaters.getRootHTMLElement(),
    props.renderer.getRendererDOM(),
    ...props.tdBinder.getDOMLayerElements(),
  ];
  elements.forEach((element) => {
    body.appendChild(element);
  });
}