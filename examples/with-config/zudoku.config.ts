import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  search: {
    type: "pagefind",
  },
  theme: {
    fonts: {
      sans: "Vazirmatn",
      serif: "Vazirmatn",
      mono: "Vazircode",
    },
  },
  site: {
    lang: "fa",
    logo: {
      src: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
      alt: "Zudoku",
      width: 130,
    },
  },
  navigation: [
    {
      type: "category",
      label: "معرفی",
      link: "documentation/installation",
      items: [
        {
          type: "category",
          label: "شروع کنید",
          items: ["documentation/introduction", "documentation/installation"],
        },
      ],
    },
    {
      type: "link",
      to: "/api/rick-and-morty",
      label: "مستندات فهم",
    },
  ],
  redirects: [{ from: "/", to: "/documentation/introduction" }],
  apis: [
    {
      type: "file",
      input: "./openapi.yaml",
      path: "api/rick-and-morty",
    },
    {
      type: "url",
      input: [
        {
          path: "v2",
          label: "v2 (latest)",
          input:
            "https://api.apis.guru/v2/specs/adyen.com/BalancePlatformService/2/openapi.json",
        },
        {
          path: "v1",
          label: "v1",
          input:
            "https://api.apis.guru/v2/specs/adyen.com/BalancePlatformService/1/openapi.json",
        },
      ],
      path: "api/adyen-balance",
    },
  ],
  defaults: {
    apis: {
      schemaDownload: {
        enabled: true,
      },
    },
  },
  docs: {
    files: "/pages/**/*.mdx",
  },
};

export default config;
