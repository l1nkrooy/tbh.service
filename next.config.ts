import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // SVG-иллюстрации персонажей и эмблемы классов — собственные локальные
    // файлы (не пользовательский ввод), поэтому безопасно разрешить
    // их оптимизацию через next/image.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
