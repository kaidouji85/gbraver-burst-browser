// @flow

export type Param = {
  dom: HTMLElement,
  movieURL: string
};

export class HowToPlayView {
  constructor(param: Param) {
    param.dom.innerHTML = `
      <div class="how-to-play">
        <iframe width="560" height="315" src="${param.movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> 
        </iframe>
      </div>
    `;
  }
}