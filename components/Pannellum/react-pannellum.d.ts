/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-pannellum' {
  import { Component, HTMLAttributes } from 'react';

  interface PannellumProps extends HTMLAttributes<HTMLDivElement> {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    width: string | number;
    height: string | number;
    image:
      | string
      | {
          type: 'equirectangular' | 'cubemap' | 'multires';
          cubemap?: Array<string>;
          fallback?: string;
          preview?: string;
          tileSize?: number;
          tileResolution?: number;
          basePath?: string;
          dynamic?: boolean;
          url?: string;
        };
    pitch?: number;
    yaw?: number;
    hfov?: number;
    minHfov?: number;
    maxHfov?: number;
    minPitch?: number;
    maxPitch?: number;
    minYaw?: number;
    maxYaw?: number;
    autoLoad?: boolean;
    autoRotate?: number;
    autoRotateInactivityDelay?: number;
    autoRotateStopDelay?: number;
    keyboardZoom?: boolean;
    mouseZoom?: boolean;
    draggable?: boolean;
    preview?: string;
    previewTitle?: string;
    previewAuthor?: string;
    previewSource?: string;
    author?: string;
    title?: string;
    firstScene?: string;
    scenes?: {
      [key: string]: {
        title?: string;
        hfov?: number;
        yaw?: number;
        pitch?: number;
        type?: 'equirectangular' | 'cubemap' | 'multires';
        panorama?:
          | string
          | {
              cubemap?: Array<string>;
              fallback?: string;
              preview?: string;
              tileSize?: number;
              tileResolution?: number;
              basePath?: string;
              dynamic?: boolean;
            };
        hotSpots?: Array<{
          pitch?: number;
          yaw?: number;
          type: 'scene' | 'info' | 'custom';
          text?: string;
          URL?: string;
          sceneId?: string;
          cssClass?: string;
          createTooltipFunc?: (hotSpotDiv: HTMLDivElement, args: any) => void;
          createTooltipArgs?: any;
          id?: string;
        }>;
      };
    };
    onScenechange?: (e: any) => void;
    onScenechangefadedone?: (e: any) => void;
    onScenechangestart?: (e: any) => void;
    onScenechangedone?: (e: any) => void;
    onError?: (e: any) => void;
  }

  export default class Pannellum extends Component<PannellumProps> {}
}
