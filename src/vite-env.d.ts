/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare class BMapGL {
  static Map: any
  static Point: any
  static LocalCity: any
  static Geocoder: any
  static ScaleControl: any
  static ZoomControl: any
  static Label: any
  static Size: any
}
