import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.konsta',
  appName: 'konsta',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
