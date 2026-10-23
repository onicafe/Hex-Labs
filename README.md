# Iésu Jafé — Portfólio

Portfólio pessoal de **Iésu Jafé**, Product Designer, UX Engineer e IA aplicada, em Natal (RN).

O site reúne estudos de caso (meu papel, o problema, o processo e o resultado), o currículo e formas de contato. Os projetos em destaque são o PJe2 Mobile (TRF5) e o Jovem Potiguar (IFRN/Governo do RN), os dois como trabalho voluntário, além do Intelbras UCR, dos portais da UFRN e de produtos da Dione. A Hex Labs, empresa que fundei, aparece como um dos projetos.

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

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Nome, título, contatos e link do PDF do CV | `src/data/profile.ts` |
| Projetos e estudos de caso | `src/data/projects.ts` |
| Experiência, formação e ferramentas | `src/pages/Resume.tsx` |
| Logos das organizações | `src/components/TrustedBy.tsx` |

Para oferecer o CV em PDF, coloque o arquivo em `public/` (por exemplo `public/cv-iesu-jafe.pdf`) e preencha `cvPdfUrl` em `src/data/profile.ts`. Enquanto o campo estiver vazio, o botão "Baixar CV" leva à página `/curriculo`, que tem a opção de salvar em PDF pelo navegador.

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
