const common: RegExp[] = [];

export const prod: RegExp[] = [...common];

export const local: RegExp[] = [
  ...common,
  /^https?:\/\/localhost(:\d+)?\//,
  /^https?:\/\/127\.0\.0\.1(:\d+)?\//,
  /^https?:\/\/192\.168\.\d+\.\d+(:\d+)?\//,
];
