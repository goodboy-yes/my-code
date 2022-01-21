import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
const pathResolve = (dir: string): any => resolve(__dirname, '.', dir);
const alias: Record<string, string> = {
  '@': pathResolve('src')
};
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias,
    },
    plugins:[vue()]
  };
};
