import * as esbuild from "esbuild-wasm";


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

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, onResolveIndex);

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, onResolveNestedPath)

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, onResolveResult);
    },
  };
};

