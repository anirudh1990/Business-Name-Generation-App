
export interface StartupName {
  name: string;
  tagline: string;
}

export interface GenerationResponse {
  names: StartupName[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
