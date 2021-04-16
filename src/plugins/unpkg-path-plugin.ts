import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

const onLoadResult = async (args: any, contents: string): Promise<esbuild.OnLoadResult> => {

  if (args.path === "index.js")
    return { loader: "jsx", contents };

  const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

  if (cachedResult) return cachedResult;

  const { data, request } = await axios.get(args.path);

  const result: esbuild.OnLoadResult = {
    loader: "jsx",
    contents: data,
    resolveDir: new URL("./", request.responseURL).pathname,
  };

  await fileCache.setItem(args.path, result);

  return result;
}


const onResolveIndex = () => ({ path: 'index.js', namespace: 'a' })


const onResolveNestedPath = async (args: any): Promise<esbuild.OnResolveResult> => ({
  namespace: "a",
  path: new URL(
    args.path,
    "https://unpkg.com" + args.resolveDir + "/"
  ).href,
})


const onResolveResult = async (args: any): Promise<esbuild.OnResolveResult> => ({
  namespace: "a",
  path: `https://unpkg.com/${args.path}`,
})

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, onResolveIndex);

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, onResolveNestedPath)

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, onResolveResult);

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        return onLoadResult(args, inputCode)
      });
    },
  };
};

