import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/docs/BrunoCurriculo.pdf', destination: '/docs/bruno-furtado-curriculo-pt.pdf', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
