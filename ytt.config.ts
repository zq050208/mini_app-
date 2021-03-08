import { Config } from 'yapi-to-typescript';

const config: Config = [
  {
    serverUrl: 'http://yapi.golcer.cn/',
    typesOnly: true,
    reactHooks: {
      enabled: false,
    },
    prodEnvName: 'production',
    outputFilePath: 'src/types/models.d.ts',
    dataKey: 'data',
    projects: [
      {
        token:
          'd4fde32b7af8d13e3971f61b730a29939a9dea65cd4e066935ea33351bb2be0d',
        categories: [
          {
            id: 1981,
            getRequestFunctionName(interfaceInfo, changeCase) {
              return changeCase.camelCase(
                interfaceInfo.parsedPath.dir.split('/').join(' ') +
                  ' ' +
                  interfaceInfo.parsedPath.name,
              );
            },
          },
        ],
      },
    ],
  },
];

export default config;
