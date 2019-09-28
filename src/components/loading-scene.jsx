// @flow

import React from 'react';
import {resourceBasePath} from "../js/resource/resource-base-path";
import type {LoadingModel} from "../js/loading/model/loading-model";

/**
 * 読み込みシーン
 *
 * @param model モデル
 * @return 読み込みシーン
 */
export function LoadingScene(model: LoadingModel) {
  return (
    <div className="loading" style={{
      display: model.isVisible
        ? 'grid'
        : 'none'
    }}>
      <img className="loading__logo" src={`${resourceBasePath()}/logo.png`}/>
      <div className="loading__completed-rate">
        <div className="loading__completed-rate__text">
          {`LOADING... ${Math.floor(model.completedRate.value * 100)}%`}
        </div>
        <div className="loading__completed-rate__bar">
          <div className="loading__completed-rate__bar__completed" style={{
            width: `${model.completedRate.value * 100}%`
          }}></div>
        </div>
      </div>
    </div>
  );
}