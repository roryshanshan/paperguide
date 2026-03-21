import * as migration_20260321_003415 from './20260321_003415';

export const migrations = [
  {
    up: migration_20260321_003415.up,
    down: migration_20260321_003415.down,
    name: '20260321_003415'
  },
];
