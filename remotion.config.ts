import { Config } from '@remotion/cli/config';

/**
 * Konfigurasi Remotion CLI.
 * - `npx remotion studio`  : buka Remotion Studio untuk preview lokal
 * - `npx remotion render IntroPromo out/intro.mp4` : render komposisi ke MP4
 */
Config.setEntryPoint('./src/remotion/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setOverwriteOutput(true);
