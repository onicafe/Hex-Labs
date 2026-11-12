# Iésu Jafé — Portfólio

Portfólio pessoal de **Iésu Jafé**, Product & Game Designer, em Natal (RN).

O site reúne estudos de caso (meu papel, o problema, o processo e o resultado), o currículo e formas de contato. O destaque é a SpillFabrikken, com uma página por jogo. Também estão lá o PJe2 Mobile (TRF5) e o Jovem Potiguar (IFRN/Governo do RN), os dois como trabalho voluntário, e os produtos da Dione Solutions. A Hex Labs, empresa que fundei, aparece como um dos projetos.

## Tecnologias

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) e [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) para animações
- [React Router](https://reactrouter.com/)
- [Supabase](https://supabase.com/) (opcional), usado só na área administrativa, no blog e no analytics

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou mais recente.

```bash
git clone https://github.com/onicafe/Hex-Labs.git
cd Hex-Labs
npm install
npm run dev
```

Abra `http://localhost:8080`.

O site funciona **sem Supabase**: a home, os projetos e o currículo usam só os dados estáticos do repositório. Para ativar o admin, o blog e o analytics, crie um arquivo `.env` com:

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

## Publicação (GitHub Pages)

```bash
npm run build:pages
```

Gera a pasta `dist/` para https://onicafe.github.io/Hex-Labs/. Depois, o conteúdo de `dist/` vai para a branch `gh-pages`. O build:

- renderiza cada rota pública em HTML (`src/entry-server.tsx` + `scripts/prerender.mjs`), para que buscadores e prévias de link leiam o conteúdo sem executar JavaScript;
- grava em cada página o título, a descrição, a prévia (Open Graph), o endereço canônico e dados estruturados JSON-LD (pessoa, estudos de caso e trilha de navegação);
- gera `sitemap.xml`, `robots.txt`, `404.html` e `.nojekyll`.

O admin e o blog dependem do Supabase e carregam sob demanda, fora do pacote das páginas públicas.

### Google Search Console

1. Em https://search.google.com/search-console, adicione uma propriedade do tipo **Prefixo do URL** com o endereço do site.
2. Escolha a verificação por **Tag HTML** e copie só o valor de `content`.
3. Cole esse valor em `googleSiteVerification`, em `src/data/profile.ts`, e publique de novo.
4. Depois de verificar, envie o sitemap (`sitemap.xml`) em **Sitemaps**.

Ao trocar de endereço (domínio próprio ou repositório `onicafe.github.io`), mude `siteUrl` em `src/data/profile.ts` e `base` em `vite.config.ts`.

## Idiomas

O site tem português (raiz) e inglês (`/en`). Os textos fixos dos componentes usam `tr("pt", "en")` de `src/i18n`. O conteúdo fica em dois conjuntos de arquivos com a mesma estrutura: `src/data/*.ts` (português) e `src/data/en/*.ts` (inglês). Ao mudar um projeto em português, mude também a versão em inglês. O build gera as duas versões de cada página, com `hreflang` ligando uma à outra.

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Nome, título, contatos e link do PDF do CV | `src/data/profile.ts` |
| Projetos e estudos de caso (seções, pranchas, métricas) | `src/data/projects.ts` e `src/data/en/projects.ts` |
| SpillFabrikken (marca, jogos e pranchas) | `src/data/spillfabrikken.ts` e `src/data/en/spillfabrikken.ts` |
| Título, prévia e dados estruturados de cada página | `src/data/routeMeta.ts` |
| Endereço do site e verificação do Google | `src/data/profile.ts` |
| Currículo (experiência, formação, ferramentas) | `src/data/resume.ts` e `src/data/en/resume.ts` |
| Logos das organizações | `src/components/TrustedBy.tsx` |

O CV em PDF fica em `public/Iesu-Jafe-CV.pdf` e é ligado em `cvPdfUrl`, em `src/data/profile.ts`.

## Estrutura

```
src/
├── components/   # Seções da home e componentes de UI
├── data/         # Conteúdo estático: perfil e projetos
├── pages/        # Páginas (home, projetos, estudo de caso, currículo, blog, admin)
├── lib/          # Supabase (opcional), SEO e utilitários
└── assets/       # Imagens e logos
public/projects/  # Imagens dos estudos de caso
```

## Créditos

Site desenvolvido por Iésu Jafé e Rafael Neves.

## Contato

- E-mail: jafe.iesu@gmail.com
- LinkedIn: [linkedin.com/in/iesujafe](https://www.linkedin.com/in/iesujafe/)
- Behance: [behance.net/iesujafe](https://behance.net/iesujafe)
