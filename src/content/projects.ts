import type { Locale } from 'next-intl';


export interface ProjectMedia {
  desktop?: string;
  mobile?: string;
  domain?: string;
  diagram?: boolean;
}

interface Section {
  title: string;
  body: string;
}

export interface ProjectCopy {
  title: string;
  category: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  context?: string;
  approach?: Section[];
  architecture?: {
    intro: string;
    layers: { name: string; detail: string }[];
    note: string;
  };
  decisions?: { title: string; problem: string; decision: string }[];
  quality?: string[];
  status?: { implemented: string[]; planned: string[] };
  outcome?: {
    text?: string;
    quote?: { text: string; author: string; role: string };
  };
  alt: { desktop?: string; mobile?: string };
}

export interface Project {
  slug: string;
  tier: 'featured' | 'selected';
  caseStudy: boolean;
  stack: string[];
  links: { live?: string; repo?: string };
  media: ProjectMedia;
  copy: Record<Locale, ProjectCopy>;
}

export const projects: Project[] = [
  {
    slug: 'kairo',
    tier: 'featured',
    caseStudy: true,
    stack: ['Expo', 'React Native', 'Expo Router', 'TypeScript', 'SQLite', 'React Query', 'Zustand', 'Zod', 'NativeWind', 'Jest'],
    links: { repo: 'https://github.com/brunodkf/kairo' },
    media: { diagram: true },
    copy: {
      en: {
        title: 'Kairo',
        category: 'Independent product · Mobile & Web',
        period: '2026 · In development',
        role: 'Architecture, Design System and implementation',
        summary:
          'Offline-first personal finance app built with Expo, React Native and TypeScript. All financial data lives on the device in SQLite, which keeps it fast, private and independent of a network connection.',
        highlights: [
          'Layered, feature-first architecture: Repository → Service → Hook → UI',
          'Architecture decisions recorded as ADRs before implementation',
          'Unit tests for services, migrations and Design System components',
        ],
        context:
          'A finance app has to be trustworthy before anything else: balances must always add up, data must survive without a connection, and the codebase must stay maintainable as cards, installments, recurring transactions and sync arrive. Its architecture was planned around those constraints and documented before implementation.',
        architecture: {
          intro:
            'Business rules live in services, data access in repositories and React only orchestrates. Each layer has a single responsibility and a list of things it is not allowed to do.',
          layers: [
            { name: 'UI', detail: 'Expo Router screens compose Design System components and consume hooks, with no SQL and no business rules.' },
            { name: 'Hooks', detail: 'Call services and cache results with React Query, exposing loading and error state.' },
            { name: 'Services', detail: 'The only place with business rules; plain TypeScript, unit tested.' },
            { name: 'Repositories', detail: 'Data access for one entity, mapping rows to typed domain entities; depend only on a DatabaseAdapter.' },
            { name: 'SQLite', detail: 'Single source of truth for financial data, with versioned migrations.' },
          ],
          note: 'The Design System consumes only theme tokens and receives data exclusively through props, so it could be extracted as a standalone package.',
        },
        decisions: [
          {
            title: 'Money as integer cents',
            problem: 'Floating-point arithmetic produces rounding errors that are unacceptable in a finance app (0.1 + 0.2 ≠ 0.3).',
            decision: 'Every amount is stored as an INTEGER in cents and only converted for display in the formatting layer.',
          },
          {
            title: 'Derived balances',
            problem: 'A stored balance column drifts out of sync when transactions are edited, deleted or imported.',
            decision: 'Accounts store only their initial balance; the current balance is always computed from transactions and cached by React Query, invalidated on mutations.',
          },
          {
            title: 'The database as a local server',
            problem: 'Duplicating database data in client stores creates two sources of truth.',
            decision: 'React Query owns everything that comes from SQLite; Zustand holds UI state only. Treating SQLite as a "local server" keeps future sync close to transparent.',
          },
          {
            title: 'Ready for sync, without building it',
            problem: 'Auto-increment IDs collide across devices, and hard deletes break history.',
            decision: 'Client-generated UUID v4 IDs, ISO-8601 UTC dates and soft delete with audit timestamps on every table.',
          },
          {
            title: 'Adapters instead of dropping features',
            problem: 'MMKV, used for preferences on native, does not exist on the web.',
            decision: 'A PreferencesStorage interface with MMKV and localStorage implementations, resolved per platform (.ts / .web.ts).',
          },
          {
            title: 'Versioned migrations',
            problem: 'Ad-hoc "CREATE TABLE IF NOT EXISTS" calls scattered across the code make schema changes unpredictable.',
            decision: 'Sequential migrations tracked with PRAGMA user_version and executed inside a transaction at startup.',
          },
        ],
        quality: [
          'TypeScript strict mode, with Zod validation at the edges (forms and backup import).',
          'A single typed error hierarchy (AppError → DomainError, ValidationError, NotFoundError, DatabaseError) mapped by code in the UI.',
          'Jest and Testing Library tests for services, the migration and seed runners, utilities and Design System components.',
        ],
        status: {
          implemented: ['Dashboard', 'Accounts', 'Categories', 'Income & expense tracking', 'Transfers', 'Cash flow visualization'],
          planned: ['Budgets', 'Credit cards & installments', 'Recurring transactions', 'Data export', 'Cloud backup & multi-device sync'],
        },
        alt: {},
      },
      pt: {
        title: 'Kairo',
        category: 'Produto independente · Mobile & Web',
        period: '2026 · Em desenvolvimento',
        role: 'Arquitetura, Design System e implementação',
        summary:
          'App de finanças pessoais offline-first construído com Expo, React Native e TypeScript. Todos os dados financeiros ficam no dispositivo, em SQLite, o que o torna rápido, privado e independente de conexão.',
        highlights: [
          'Arquitetura em camadas e feature-first: Repository → Service → Hook → UI',
          'Decisões de arquitetura registradas em ADRs antes da implementação',
          'Testes unitários de services, migrations e componentes do Design System',
        ],
        context:
          'Um app financeiro precisa ser confiável antes de qualquer outra coisa: os saldos têm que fechar sempre, os dados precisam sobreviver sem conexão e o código precisa continuar manutenível à medida que cartões, parcelamentos, recorrências e sincronização chegam. A arquitetura do Kairo foi planejada em torno dessas restrições e documentada antes da implementação.',
        architecture: {
          intro:
            'Regras de negócio ficam nos services, acesso a dados nos repositories e o React apenas orquestra. Cada camada tem uma única responsabilidade e uma lista do que não pode fazer.',
          layers: [
            { name: 'UI', detail: 'Telas do Expo Router compõem componentes do Design System e consomem hooks, sem SQL e sem regra de negócio.' },
            { name: 'Hooks', detail: 'Chamam services e fazem cache com React Query, expondo estados de carregamento e erro.' },
            { name: 'Services', detail: 'Único lugar com regra de negócio; TypeScript puro e com testes unitários.' },
            { name: 'Repositories', detail: 'Acesso a dados de uma entidade, mapeando linhas para entidades de domínio tipadas; dependem apenas de um DatabaseAdapter.' },
            { name: 'SQLite', detail: 'Única fonte de verdade dos dados financeiros, com migrations versionadas.' },
          ],
          note: 'O Design System consome apenas tokens do tema e recebe dados exclusivamente por props, podendo ser extraído como pacote independente.',
        },
        decisions: [
          {
            title: 'Dinheiro em centavos inteiros',
            problem: 'Aritmética de ponto flutuante gera erros de arredondamento inaceitáveis em um app financeiro (0.1 + 0.2 ≠ 0.3).',
            decision: 'Todo valor é armazenado como INTEGER em centavos e convertido apenas para exibição, na camada de formatação.',
          },
          {
            title: 'Saldo derivado',
            problem: 'Uma coluna de saldo armazenada dessincroniza quando transações são editadas, excluídas ou importadas.',
            decision: 'A conta guarda apenas o saldo inicial; o saldo atual é sempre calculado a partir das transações e mantido em cache pelo React Query, invalidado a cada mutação.',
          },
          {
            title: 'O banco como servidor local',
            problem: 'Duplicar dados do banco em stores do cliente cria duas fontes de verdade.',
            decision: 'O React Query é dono de tudo que vem do SQLite; o Zustand guarda apenas estado de UI. Tratar o SQLite como "servidor local" deixa a futura sincronização quase transparente.',
          },
          {
            title: 'Pronto para sincronizar, sem implementar a sincronização',
            problem: 'IDs auto-incrementais colidem entre dispositivos, e exclusões definitivas quebram o histórico.',
            decision: 'IDs UUID v4 gerados no cliente, datas ISO-8601 em UTC e soft delete com timestamps de auditoria em todas as tabelas.',
          },
          {
            title: 'Adapters em vez de remover funcionalidades',
            problem: 'O MMKV, usado para preferências no nativo, não existe na web.',
            decision: 'Uma interface PreferencesStorage com implementações em MMKV e localStorage, resolvidas por plataforma (.ts / .web.ts).',
          },
          {
            title: 'Migrations versionadas',
            problem: 'Chamadas avulsas de "CREATE TABLE IF NOT EXISTS" espalhadas pelo código tornam mudanças de schema imprevisíveis.',
            decision: 'Migrations sequenciais controladas por PRAGMA user_version e executadas dentro de uma transação na inicialização.',
          },
        ],
        quality: [
          'TypeScript em modo strict, com validação Zod nas bordas (formulários e importação de backup).',
          'Hierarquia única de erros tipados (AppError → DomainError, ValidationError, NotFoundError, DatabaseError), mapeada por código na UI.',
          'Testes com Jest e Testing Library para services, runners de migrations e seeds, utilitários e componentes do Design System.',
        ],
        status: {
          implemented: ['Dashboard', 'Contas', 'Categorias', 'Receitas e despesas', 'Transferências', 'Visualização de fluxo de caixa'],
          planned: ['Orçamentos', 'Cartões de crédito e parcelamentos', 'Transações recorrentes', 'Exportação de dados', 'Backup em nuvem e sincronização entre dispositivos'],
        },
        alt: {},
      },
    },
  },
  {
    slug: 'batata-com-granulado',
    tier: 'featured',
    caseStudy: true,
    stack: ['SvelteKit', 'Svelte 5', 'TypeScript', 'Vite'],
    links: { live: 'https://www.batatacomgranulado.com.br/' },
    media: { desktop: '/projects/batata-com-granulado/desktop.webp', mobile: '/projects/batata-com-granulado/mobile.webp' },
    copy: {
      en: {
        title: 'Batata com Granulado',
        category: 'Digital product · Online menu and ordering',
        period: '2026',
        role: 'Development',
        summary:
          'Digital menu and ordering app for a stuffed-potato and dessert delivery brand, built with SvelteKit and Svelte 5. Customers browse the menu, customize each item and send a complete, priced order through WhatsApp.',
        highlights: [
          'Combos with swappable items priced by difference, required flavors and add-ons',
          'Cart state with Svelte 5 runes: merged lines, live totals and delivery fee',
          'Mobile-first experience with responsive images, self-hosted fonts and keyboard-aware sheets',
        ],
        context:
          'Food orders get complicated quickly: combos with swaps, items that require a flavor, paid add-ons, notes and delivery or pickup. The app makes that kind of order simple to build on a phone, and it arrives structured and correctly priced.',
        approach: [
          {
            title: 'The menu as typed data',
            body: 'Products, categories, add-ons and combos live in a typed catalog. A combo is described as fixed parts plus swappable slots, each with its default item and the options allowed in its place.',
          },
          {
            title: 'Combo customization with fair pricing',
            body: 'Swapping an item inside a combo adds only the price difference between the chosen option and the default one; choosing something cheaper never turns into a discount.',
          },
          {
            title: 'A single reactive cart',
            body: 'One store built with Svelte 5 runes ($state and $derived) holds the cart lines, quantities, subtotal, delivery fee and total. Adding an item with the same configuration merges it into the existing line instead of duplicating it.',
          },
          {
            title: 'A guided product sheet',
            body: 'Required flavors are validated before adding, moving focus to the missing choice; add-ons and a 120-character note are optional. If the sheet is closed before adding, the configuration is kept as a draft.',
          },
          {
            title: 'Feedback at every step',
            body: 'Cards confirm when an item is added, changes are announced to screen readers, emptying the cart asks for confirmation and the checkout confirms when the order has been sent.',
          },
          {
            title: 'Checkout through WhatsApp',
            body: 'Delivery or pickup, name and address validation and payment method. The order is serialized into a structured WhatsApp message with items, combo contents, swaps, add-ons, notes and totals.',
          },
        ],
        quality: [
          'Responsive images: product photos in 360, 720 and full-size versions through srcset, a hero banner served at three widths with high fetch priority, and lazy loading below the fold.',
          'Self-hosted WOFF2 font subsets (latin and latin-ext), preloaded in the document head.',
          'Product sheets built on the native dialog element and adapted to the on-screen keyboard with the VisualViewport API, keeping focused fields in view.',
          'Animations respect prefers-reduced-motion.',
        ],
        alt: {
          desktop: 'Batata com Granulado home page on desktop: headline, ordering buttons and menu categories over a photo of a stuffed potato',
          mobile: 'Combo customization on a phone: combo contents and swap options with the price difference for each choice',
        },
      },
      pt: {
        title: 'Batata com Granulado',
        category: 'Produto digital · Cardápio e pedidos online',
        period: '2026',
        role: 'Desenvolvimento',
        summary:
          'Cardápio digital e aplicação de pedidos para uma marca de delivery de batatas recheadas e doces, construída com SvelteKit e Svelte 5. O cliente navega pelo cardápio, personaliza cada item e envia um pedido completo e já calculado pelo WhatsApp.',
        highlights: [
          'Combos com troca de itens cobrada pela diferença, sabores obrigatórios e adicionais',
          'Estado do carrinho com runes do Svelte 5: itens agrupados, totais em tempo real e taxa de entrega',
          'Experiência mobile-first com imagens responsivas, fontes locais e painéis que se adaptam ao teclado',
        ],
        context:
          'Pedidos de comida ficam complexos rapidamente: combos com trocas, itens que exigem um sabor, adicionais pagos, observações e entrega ou retirada. A aplicação torna simples montar esse tipo de pedido no celular, e ele chega estruturado e com o valor correto.',
        approach: [
          {
            title: 'O cardápio como dados tipados',
            body: 'Produtos, categorias, adicionais e combos ficam em um catálogo tipado. Um combo é descrito como partes fixas e partes trocáveis, cada uma com o item padrão e as opções permitidas no lugar dele.',
          },
          {
            title: 'Personalização de combos com preço justo',
            body: 'Trocar um item dentro do combo acrescenta apenas a diferença de preço entre a opção escolhida e a padrão; escolher algo mais barato nunca vira desconto.',
          },
          {
            title: 'Um único carrinho reativo',
            body: 'Uma store construída com runes do Svelte 5 ($state e $derived) concentra os itens do carrinho, as quantidades, o subtotal, a taxa de entrega e o total. Adicionar um item com a mesma configuração soma à linha existente em vez de duplicá-la.',
          },
          {
            title: 'Uma ficha de produto guiada',
            body: 'Sabores obrigatórios são validados antes de adicionar, levando o foco para a escolha que falta; adicionais e uma observação de até 120 caracteres são opcionais. Se a ficha for fechada antes de adicionar, a configuração fica guardada como rascunho.',
          },
          {
            title: 'Feedback em cada etapa',
            body: 'Os cards confirmam quando um item é adicionado, as mudanças são anunciadas para leitores de tela, esvaziar o carrinho pede confirmação e o checkout confirma quando o pedido foi enviado.',
          },
          {
            title: 'Checkout pelo WhatsApp',
            body: 'Entrega ou retirada, validação de nome e endereço e forma de pagamento. O pedido é transformado em uma mensagem estruturada de WhatsApp com itens, composição dos combos, trocas, adicionais, observações e totais.',
          },
        ],
        quality: [
          'Imagens responsivas: fotos dos produtos em versões de 360, 720 e tamanho original via srcset, banner principal servido em três larguras com prioridade alta de carregamento e lazy loading abaixo da dobra.',
          'Subconjuntos de fontes WOFF2 hospedados no próprio projeto (latin e latin-ext), com preload no head do documento.',
          'Fichas de produto construídas com o elemento dialog nativo e adaptadas ao teclado do celular com a API VisualViewport, mantendo o campo em foco visível.',
          'As animações respeitam prefers-reduced-motion.',
        ],
        alt: {
          desktop: 'Página inicial da Batata com Granulado no desktop: título, botões de pedido e categorias do cardápio sobre a foto de uma batata recheada',
          mobile: 'Personalização de combo no celular: composição do combo e opções de troca com a diferença de preço de cada escolha',
        },
      },
    },
  },
  {
    slug: 'startcrypto',
    tier: 'selected',
    caseStudy: true,
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Swiper', 'CoinGecko API'],
    links: { live: 'https://startscrypto.com.br/', repo: 'https://github.com/brunodkf/start_crypto' },
    media: { desktop: '/projects/startcrypto/desktop.webp', mobile: '/projects/startcrypto/mobile.webp', domain: 'startscrypto.com.br' },
    copy: {
      en: {
        title: 'StartCrypto',
        category: 'Client project · Sales landing page',
        period: '2025',
        role: 'Freelance development',
        summary:
          'Sales site for an introductory cryptocurrency course, built for its founder with Next.js and TypeScript, including live market quotes so the content stays concrete.',
        highlights: [
          'Live quotes from the CoinGecko API through a Next.js Route Handler',
          'Shared market data refreshed every 60 seconds on the client',
          'Separate video sales page with a direct checkout link',
        ],
        context:
          'The course founder needed a page that explained the course clearly and led visitors to sign up. Showing real market prices, instead of static numbers, makes the subject tangible for beginners.',
        approach: [
          {
            title: 'Third-party data behind a Route Handler',
            body: 'A Next.js Route Handler (/api/crypto) queries the CoinGecko markets endpoint on the server and returns the result to the page, keeping the external call out of the browser.',
          },
          {
            title: 'One source of market data',
            body: 'A typed React context fetches the quotes, exposes a loading state and refreshes the data every 60 seconds; the quote cards consume it through a hook.',
          },
          {
            title: 'Formatting and states',
            body: 'Prices are formatted with Intl.NumberFormat, and the 24-hour change drives the trend indicator for each coin.',
          },
          {
            title: 'Conversion-focused pages',
            body: 'Responsive landing page with testimonials (Swiper), Framer Motion animations and SEO metadata, plus a dedicated video sales letter page with a countdown and checkout link.',
          },
        ],
        outcome: {
          quote: {
            text: 'He got it right the first time and delivered the website without having to make any changes. It was exactly what I needed and wanted!',
            author: 'Rodrigo Marques',
            role: 'Instructor and Founder, Start Crypto',
          },
        },
        alt: {
          desktop: 'StartCrypto landing page on desktop: headline, call-to-action buttons and live quote cards for BTC, ETH, BNB and LINK',
          mobile: 'StartCrypto landing page on a mobile screen',
        },
      },
      pt: {
        title: 'StartCrypto',
        category: 'Projeto para cliente · Landing page de vendas',
        period: '2025',
        role: 'Desenvolvimento freelance',
        summary:
          'Site de vendas de um curso introdutório de criptomoedas, desenvolvido para o fundador com Next.js e TypeScript, com cotações de mercado em tempo real para tornar o conteúdo concreto.',
        highlights: [
          'Cotações ao vivo da API da CoinGecko via Route Handler do Next.js',
          'Dados de mercado compartilhados e atualizados a cada 60 segundos no cliente',
          'Página de vendas em vídeo separada, com link direto para o checkout',
        ],
        context:
          'O fundador do curso precisava de uma página que explicasse o curso com clareza e levasse o visitante à inscrição. Mostrar preços reais de mercado, em vez de números estáticos, torna o assunto palpável para iniciantes.',
        approach: [
          {
            title: 'Dados de terceiros atrás de um Route Handler',
            body: 'Um Route Handler do Next.js (/api/crypto) consulta o endpoint de mercado da CoinGecko no servidor e devolve o resultado para a página, mantendo a chamada externa fora do navegador.',
          },
          {
            title: 'Uma única fonte de dados de mercado',
            body: 'Um context React tipado busca as cotações, expõe o estado de carregamento e atualiza os dados a cada 60 segundos; os cards de cotação consomem tudo por um hook.',
          },
          {
            title: 'Formatação e estados',
            body: 'Os preços são formatados com Intl.NumberFormat, e a variação de 24 horas define o indicador de tendência de cada moeda.',
          },
          {
            title: 'Páginas focadas em conversão',
            body: 'Landing page responsiva com depoimentos (Swiper), animações com Framer Motion e metadados de SEO, além de uma página de vendas em vídeo com contagem regressiva e link de checkout.',
          },
        ],
        outcome: {
          quote: {
            text: 'De primeira ele acertou e entregou o site sem precisar fazer alteração. Foi exatamente da forma q eu precisava e queria!',
            author: 'Rodrigo Marques',
            role: 'Instrutor e Fundador, Start Crypto',
          },
        },
        alt: {
          desktop: 'Landing page da StartCrypto no desktop: título, botões de ação e cards de cotação ao vivo de BTC, ETH, BNB e LINK',
          mobile: 'Landing page da StartCrypto em uma tela de celular',
        },
      },
    },
  },
  {
    slug: 'game-deals',
    tier: 'selected',
    caseStudy: false,
    stack: ['Next.js', 'TypeScript', 'TanStack Table', 'shadcn/ui', 'Tailwind CSS'],
    links: { live: 'https://game-deals-wheat.vercel.app/', repo: 'https://github.com/brunodkf/game-deals' },
    media: { desktop: '/projects/game-deals/desktop.webp', domain: 'game-deals-wheat.vercel.app' },
    copy: {
      en: {
        title: 'Game Deals',
        category: 'Independent project · Web app',
        period: '2025',
        role: 'Development',
        summary: 'Deal-tracking dashboard for PC games powered by the CheapShark API, with table and card views, filters, favorites and a cart.',
        highlights: [
          'Server-side fetch with 5-minute ISR revalidation and a request timeout',
          'Store and price filters resolved by a Route Handler; search, discount and sorting on the client',
          'Favorites and cart persisted in localStorage',
        ],
        alt: { desktop: 'Game Deals dashboard with filters sidebar and a table of discounted games' },
      },
      pt: {
        title: 'Game Deals',
        category: 'Projeto independente · Aplicação web',
        period: '2025',
        role: 'Desenvolvimento',
        summary: 'Dashboard de promoções de jogos para PC alimentado pela API da CheapShark, com visualização em tabela e cards, filtros, favoritos e carrinho.',
        highlights: [
          'Fetch no servidor com revalidação ISR a cada 5 minutos e timeout de requisição',
          'Filtros de loja e preço resolvidos por um Route Handler; busca, desconto e ordenação no cliente',
          'Favoritos e carrinho persistidos em localStorage',
        ],
        alt: { desktop: 'Dashboard do Game Deals com barra de filtros e tabela de jogos em promoção' },
      },
    },
  },
  {
    slug: 'la-medic-rio',
    tier: 'selected',
    caseStudy: false,
    stack: ['HTML', 'Sass', 'JavaScript'],
    links: { live: 'https://lamedicrio.com/', repo: 'https://github.com/brunodkf/LaMedicRio' },
    media: { desktop: '/projects/la-medic-rio/desktop.webp', domain: 'lamedicrio.com' },
    copy: {
      en: {
        title: 'LA Medic Rio',
        category: 'Client project · Institutional website',
        period: '2023',
        role: 'Freelance development',
        summary: 'Institutional website for a medical and hospital equipment distributor in Rio de Janeiro, focused on credibility and local SEO.',
        highlights: ['Specialties, products and testimonials sections', 'Direct contact channels: phone, WhatsApp and email'],
        alt: { desktop: 'LA Medic Rio homepage with hero image of a laboratory and partner brand logos' },
      },
      pt: {
        title: 'LA Medic Rio',
        category: 'Projeto para cliente · Site institucional',
        period: '2023',
        role: 'Desenvolvimento freelance',
        summary: 'Site institucional de uma distribuidora de produtos médicos e hospitalares no Rio de Janeiro, com foco em credibilidade e SEO local.',
        highlights: ['Seções de especialidades, produtos e depoimentos', 'Canais diretos de contato: telefone, WhatsApp e email'],
        alt: { desktop: 'Página inicial da LA Medic Rio com imagem de laboratório e logos de marcas parceiras' },
      },
    },
  },
  {
    slug: 'streaming-app',
    tier: 'selected',
    caseStudy: false,
    stack: ['React', 'Vite', 'React Router', 'Tailwind CSS', 'TMDB API'],
    links: { live: 'https://streaming-opal.vercel.app/', repo: 'https://github.com/brunodkf/streaming' },
    media: { desktop: '/projects/streaming-app/desktop.webp', domain: 'streaming-opal.vercel.app' },
    copy: {
      en: {
        title: 'Streaming App',
        category: 'Study project · Web app',
        period: '2024',
        role: 'Development',
        summary: 'Streaming-style interface consuming the TMDB API to browse, search and watch trailers of movies and series.',
        highlights: ['Routing, search and detail views with React Router', 'Data from the TMDB API via Axios'],
        alt: { desktop: 'Streaming App home screen with a featured title and trailer thumbnails' },
      },
      pt: {
        title: 'Streaming App',
        category: 'Projeto de estudo · Aplicação web',
        period: '2024',
        role: 'Desenvolvimento',
        summary: 'Interface no estilo streaming que consome a API do TMDB para explorar, buscar e assistir trailers de filmes e séries.',
        highlights: ['Rotas, busca e páginas de detalhe com React Router', 'Dados da API do TMDB via Axios'],
        alt: { desktop: 'Tela inicial do Streaming App com um título em destaque e miniaturas de trailers' },
      },
    },
  },
];

export const featuredProjects = projects.filter((p) => p.tier === 'featured');
export const selectedProjects = projects.filter((p) => p.tier === 'selected');
export const caseStudies = projects.filter((p) => p.caseStudy);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
