// @flow

import React from 'react';
import {resourceBasePath} from "../../../resource/resource-base-path";

/**
 * ランドスケープ警告ビュー
 *
 * @return ランドスケープ警告ビュー
 */
export function PlayInLandscapePresentation() {
  return (
    <div className="play-in-landscape">
      <span className="play-in-landscape__caption">横向きでプレイしてください</span>
      <img className="play-in-landscape__image" src={`${resourceBasePath()}/waring/play-in-landscape.png`} />
    </div>
  );
}