// @flow

import React from 'react';
import {resourceBasePath} from "../../../resource/resource-base-path";

/** プロパティ */
export type LoadingSceneProps = {
  isVisible: boolean,
  completedRate: number
};

/**
 * ローディングのReact Component
 *
 * @param props プロパティ
 * @return 生成結果
 */
export function Loading(props: LoadingSceneProps) {
  return (
    <div className="loading" style={{
      display: props.isVisible
        ? 'grid'
        : 'none'
    }}>
      <img className="loading__logo" src={`${resourceBasePath()}/logo.png`}/>
      <div className="loading__completed-rate">
        <div className="loading__completed-rate__text">
          {`LOADING... ${Math.floor(props.completedRate * 100)}%`}
        </div>
        <div className="loading__completed-rate__bar">
          <div className="loading__completed-rate__bar__completed" style={{
            width: `${props.completedRate * 100}%`
          }}></div>
        </div>
      </div>
    </div>
  );
}