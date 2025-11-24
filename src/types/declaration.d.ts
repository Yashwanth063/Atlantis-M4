declare module "pipwerks-scorm-api-wrapper" {
    export const SCORM: {
      init: () => boolean;
      get: (element: string) => string;
      setValue: (element: string, value: string) => void;
      save: () => void;
      commit: () => void;
      quit: () => void;
    };
  }