// @flow

/** パラメータ */
export type Param = {
  dom: HTMLElement,
  movieURL: string
};

/**
 * 遊び方シーンのビュー
 */
export class HowToPlayView {
  constructor(param: Param) {
    param.dom.innerHTML = `
      <div class="how-to-play">
        <div class="how-to-play__title">遊び方</div>
        <div class="how-to-play__movie-container">
          <iframe class="how-to-play__movie-container__movie" width="560" height="315" src="${param.movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <button class="how-to-play__prev">戻る</button>
      </div>
    `;
  }
}