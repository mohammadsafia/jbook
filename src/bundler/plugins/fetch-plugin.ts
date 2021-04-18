import * as esbuild from 'esbuild-wasm';
import axios from "axios";
import localforage from "localforage";


const fileCache = localforage.createInstance({
  name: "filecache",
});

const onLoadCashResult = async (args: any) => {
  const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

  if (cachedResult) return cachedResult;
}

const onLoadResult = async (args: any): Promise<esbuild.OnLoadResult> => {
  const { data, request } = await axios.get(args.path);

  const result: esbuild.OnLoadResult = {
    loader: 'jsx',
    contents: data,
    resolveDir: new URL("./", request.responseURL).pathname,
  };

  await fileCache.setItem(args.path, result);

  return result;
}
const onLoadIndex = (inputCode: string): esbuild.OnLoadResult => ({ loader: "jsx", contents: inputCode });

const onLoadCssFiles = async (args: any) => {
  const { data, request } = await axios.get(args.path);

  const escaped = data
    .replace(/\n/g, '')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'");

  const contents = `const style = document.createElement('style');
  style.innerText = '${escaped}';
  document.head.appendChild(style)
 `


  const result: esbuild.OnLoadResult = {
    loader: 'jsx',
    contents,
    resolveDir: new URL("./", request.responseURL).pathname,
  };

  await fileCache.setItem(args.path, result);

  return result;
}



export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => onLoadIndex(inputCode));

      build.onLoad({ filter: /.*/ }, (args: any) => {
        return onLoadCashResult(args)
      })

      build.onLoad({ filter: /.css$/ }, onLoadCssFiles);

      build.onLoad({ filter: /.*/ }, onLoadResult);
    }
  }
}