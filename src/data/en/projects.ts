import spillfabrikken from "@/assets/projects/spillfabrikken.webp";
import hosuto from "@/assets/projects/hosuto.webp";
import prism1 from "@/assets/projects/prism/1.webp";
import prism2 from "@/assets/projects/prism/2.webp";
import prism4 from "@/assets/projects/prism/4.webp";
import prism5 from "@/assets/projects/prism/5.webp";
import prism6 from "@/assets/projects/prism/6.webp";
import prism7 from "@/assets/projects/prism/7.webp";
import prism8 from "@/assets/projects/prism/8.webp";
import prism9 from "@/assets/projects/prism/9.webp";

import { publicUrl } from "@/lib/utils";
import type { CaseImage, Project } from "../projects";

// Versão em inglês de ../projects.ts: mesma estrutura, mesmas imagens e números; só o texto muda.
// Os valores de `engagement` são chaves usadas pelo código e ficam em português.

const pjeImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/pje2-mobile/${n}.webp`), caption });
const jpImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/jovem-potiguar/image${n}.webp`), caption });
const lh = (name: string) => publicUrl(`projects/lan-house/${name}.webp`);
const lhImg = (name: string, caption: string): CaseImage => ({ src: lh(name), caption });
const mtLogo = (n: number, caption: string): CaseImage => ({ src: publicUrl(`projects/my-treasure/logo-${n}.webp`), caption });
const nexusImg = (n: number, caption?: string): CaseImage => ({ src: publicUrl(`projects/nexus-imobiliaria/image${n}.webp`), caption });

export const projectsEn: Project[] = [
  {
    slug: "spillfabrikken",
    title: "SpillFabrikken",
    category: "Product & Game Design · 8 games",
    year: "2020–2021",
    client: "SpillFabrikken (Trondheim, Norway)",
    image: spillfabrikken,
    featured: true,
    role: "Product & Game Designer",
    summary:
      "Visual identity, cards, rules, and packaging for a line of Norwegian party games, from Kryptert and its four editions to Tipsy and Paranoia.",
    // A página desta marca é própria (src/pages/SpillFabrikken.tsx); os campos abaixo só servem de resumo.
    problem: "Create a line of games with different personalities that, together, looked like they came from the same publisher.",
    process: [{ title: "From concept to box", text: "Identity, game design, cards, packaging, and renders." }],
    result: ["Eight games, a shared packaging system, and four editions of Kryptert."],
    tools: ["Illustrator", "Photoshop", "3D renders"],
  },
  {
    slug: "lan-house-simulator",
    title: "Lan House Simulator",
    category: "Game design · 3D PC game",
    year: "2026",
    client: "Personal project",
    image: lh("still-lan-cheia"),
    loop: { src: publicUrl("projects/lan-house/loop.mp4"), poster: lh("loop-poster") },
    ogImage: "og-lan-house.jpg",
    accent: "#b45309",
    platform: "PC · Godot 4",
    featured: true,
    engagement: "Projeto autoral",
    role: "Game designer and art director",
    summary:
      "A first-person simulator of a Brazilian LAN house, recreated in the garage where I ran mine, in Pedro Velho, Rio Grande do Norte, as it was in 2012. A second game runs inside it: Pingado Pro, the front desk software, in pixel art. In development.",
    credits:
      "Personal project, in development. I define the design, the rules, the art direction, and the level of fidelity; I play every build and send back corrections. The programming is done with AI agents (Claude Code) under my direction. Third-party assets, all under open licenses: characters from Microsoft Rocketbox (MIT), textures from ambientCG (CC0), models from Objaverse (CC0 and CC BY, credited in the game), streets from OpenStreetMap (ODbL), voices generated locally with Kokoro (Apache 2.0), and public-domain ambient sounds.",
    problem:
      "Turn a memory, the neighborhood LAN house, into a management game with customers who feel like people and a place that anyone who lived through that era will recognize.",
    overview: {
      challenge:
        "Turn a memory, the neighborhood LAN house, into a management game people want to play: customers who feel like real people and a place that anyone who lived through that era will recognize.",
      contribution:
        "Game design, economy and satisfaction rules, art direction, dialogue writing, and the design of Pingado Pro. Every build is checked by me, playing it, and by bots that play an entire day through the interface.",
      outcome:
        "A playable PC build, with two settings, a day-night cycle, customers with seven needs, monthly bills, and the complete Pingado Pro. No release date yet.",
    },
    metrics: [
      { value: "2012", label: "Pedro Velho rebuilt house by house from 2012 photos and OpenStreetMap" },
      { value: "7", label: "needs per customer: hunger, comfort, bladder, energy, fun, social, and hygiene" },
      { value: "2 in 1", label: "a pixel-art management game running inside the 3D monitor" },
    ],
    metricsNote: "Counts from the game itself, documented in the project's README.",
    sections: [
      {
        label: "Trailer",
        title: "72 seconds of Pedro Velho",
        text: [
          "Captured straight from the game with a scripted camera and only the game's own sound: street ambience, motorbikes, the church bell, voices and the Pingado Pro beeps.",
        ],
        boards: [
          {
            kind: "video",
            src: publicUrl("projects/lan-house/trailer.mp4"),
            poster: lh("trailer-poster"),
            caption: "Lan House Simulator, work in progress · Godot 4",
          },
        ],
      },
      {
        label: "Concept",
        title: "My old LAN house, turned into a game",
        text: [
          "You're the owner. A customer arrives, looks at the line, and decides whether to wait. At the front desk, you unlock a machine, set the time, and turn on the extras. During the session, they eat, go to the bathroom, ask for another half hour, and complain about a dirty machine or a blue screen. On the way out, they pay and carry the LAN house's reputation back to the neighborhood. On the 30th, the rent and the internet bill come due.",
          "The loop is short and repeats all day, so every step needs a decision and clear feedback.",
        ],
        boards: [
          {
            kind: "steps",
            steps: [
              { title: "Arrival", text: "The customer looks at how long the line is. If it seems too long, they leave." },
              { title: "Line", text: "The bubble shows their mood. Anyone who waits too long complains and gives up." },
              { title: "Unlock", text: "In Pingado Pro: pick the machine, set the time, turn on the extras." },
              { title: "Session", text: "Needs drop, and requests and problems come up: blue screen, dirt, hunger." },
              { title: "Leaving", text: "They pay, leave a tip, or walk out unhappy and spread bad word of mouth." },
              { title: "End of the month", text: "Rent and internet. Reputation decides how many customers come tomorrow." },
            ],
          },
          {
            kind: "grid",
            columns: 2,
            figures: [
              lhImg("pv-lan-cheia-corredor", "The garage with PCs on both sides, starting at the entrance"),
              lhImg("pv-mesa-na-entrada", "Customers walking up to the owner's desk, with their mood in the bubble"),
            ],
          },
        ],
      },
      {
        label: "Place",
        title: "Pedro Velho, 2012, house by house",
        text: [
          "The main setting is the street of my old LAN house, in Pedro Velho, Rio Grande do Norte, as it appears in the Street View photos from March 2012. The photos are only a reference: the measurements come from them and from OpenStreetMap, and the textures come from open libraries.",
          "Every house on our side of the street was rebuilt one by one, with each lot's sidewalk, height, and ramp. The area is walkable to just past Praça 14 de Julho, with the cigarette kiosk, the motorcycle taxi stand, and the Igreja de São Francisco.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 3,
            uniform: true,
            figures: [
              lhImg("still-fachada-da-lan", "The LAN house's corner, with the PARE stop sign and bicycles on the sidewalk"),
              lhImg("pv-2012-casa-166", "Yellow house no. 166, with a porch and arched windows"),
              lhImg("still-cigarreira", "The masonry cigarette kiosk at the end of the median"),
              lhImg("still-rua-de-manha", "The street with parked cars, as in the 2012 photos"),
              lhImg("pv-praca-14-de-julho", "Praça 14 de Julho, raised, with a low stone wall"),
              lhImg("still-igreja-de-sao-francisco", "Igreja de São Francisco, at the end of the route"),
            ],
          },
        ],
      },
      {
        label: "Light and weather",
        title: "From dawn to night, the light tells the time",
        text: [
          "The morning sun slips past the styrofoam stuck in the gaps, clouds cast shadows on the street, and at night only the yellow bulbs on the wire and the monitors light the garage. Bounced light comes from real-time global illumination (SDFGI). Where it doesn't reach, there are soft lights placed by hand and checked against the luminance of screenshots.",
          "Between one day and the next, the night passes outside in a few shots, until the sun rises and the rooster crows.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 3,
            uniform: true,
            figures: [
              lhImg("still-amanhecer", "Dawn, in the scene between one day and the next"),
              lhImg("pv-frestas-manha", "Morning light coming through the gaps"),
              lhImg("still-fim-de-tarde", "Late afternoon, with the LAN house lights already on"),
              lhImg("pv-lampadas-incandescentes", "The two incandescent bulbs from the start of the game"),
              lhImg("pv-isopor", "Styrofoam in the gaps: light only leaks around the edges"),
              lhImg("still-esquina-ao-anoitecer", "The street at night"),
            ],
          },
        ],
      },
      {
        label: "People",
        title: "Customers with a mind of their own",
        text: [
          "Each customer has seven meters and, sometimes, a personality: the hungry one, the one with a weak bladder, the complainer who won't sit at a dirty machine, the neat one, and the gamer crew, who arrive as a group, shout, and bother whoever is sitting next to them. Ignored requests turn into dissatisfaction, and dissatisfaction turns into lost reputation.",
          "Everyone talks, with voices generated locally and subtitles colored by emotion. The people have a PS2 look on purpose (simplified meshes, 15-bit textures, and animation at 15 frames per second), which adds emotional appeal and a slight strangeness.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 2,
            figures: [
              lhImg("pv-npcs-ps2", "Customers at the counter, each one's mood in a bubble"),
              lhImg("still-banco-do-canteiro", "Neighbors chatting on the bench in the median"),
              lhImg("cliente-comendo", "Eating takes time: the session keeps running while the customer eats"),
              lhImg("still-cliente-no-balcao", "A customer at the counter, in the PS2-style look chosen for people"),
            ],
          },
        ],
      },
      {
        label: "Game within the game",
        title: "Pingado Pro 3.0, the front desk software",
        text: [
          "The program that unlocks the machines is a separate management game, in the style of games from 1999 to 2003. It runs on the 3D front desk monitor, at 507 by 441 pixels scaled up, with its own pixel font, a CRT effect, and the shop visible around the screen.",
          "The isometric map is the same LAN house as the 3D one, seen from above: each person is where they really are, wearing their model's clothes, and bubbles show hunger, sleepiness, or anger. There's a phosphor-green radar, a command card like in strategy games, a video portrait of the selected customer, and daily goals.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 2,
            figures: [
              lhImg("still-pingado-pro-no-caixa", "Pingado Pro on the front desk monitor, with the shop around it"),
              lhImg("pingado-liberar", "Isometric map: pick the machine and unlock it"),
              lhImg("pingado-pessoa", "Selected customer, with video portrait and meters"),
              lhImg("pingado-metas", "Daily goals completed"),
              lhImg("pingado-aba-jogos", "Games tab: collection, showcase, and what customers asked for"),
              lhImg("pingado-noite", "At night, the bulbs and monitors light up the map"),
            ],
          },
        ],
      },
      {
        label: "Mechanics",
        title: "LAN house problems turned into gameplay",
        text: [
          "To fix a blue screen, you walk to the machine and hold the button on the PC case: releasing it in the green zone restarts it, releasing too early does nothing, and holding too long makes Windows check the disk. People who eat leave trash, people walking by dirty the floor, and a dirty machine annoys the next customer. New games arrive through the store and have to be installed machine by machine.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 2,
            figures: [
              lhImg("reiniciar-no-dedo", "Restarting by hand, with the button on the PC case"),
              lhImg("maquina-com-lixo", "A machine with trash: the next customer complains"),
              lhImg("still-tela-azul", "Blue screen: the customer waits and the owner has to walk over to the machine"),
              lhImg("pv-fornecedor-previa-3d", "Supplier, with a 3D preview of the item"),
            ],
          },
        ],
      },
      {
        label: "Process",
        title: "Fidelity is measured, not debated",
        text: [
          "For each stretch of the street, the game screenshot is compared with the 2012 photo, side by side and from the same angle: sidewalk outline, roof, grilles, poles, even the curved road surface. Only once it matches does the work move on to the next stretch.",
          "Gameplay goes through automated tests: a bot plays an entire day through the interface at accelerated speed, and another mode measures jitter and brightness on a still image. That's how a flicker on the ceiling showed up that no single screenshot revealed.",
        ],
        boards: [
          {
            kind: "steps",
            steps: [
              { title: "Reference", text: "2012 photo and OpenStreetMap outline." },
              { title: "Measurement", text: "Widths, heights, and setbacks taken from the photo and the map." },
              { title: "Construction", text: "House, sidewalk, and roof built in code." },
              { title: "Screenshot from the same angle", text: "Game camera positioned like the one in the photo." },
              { title: "Comparison", text: "Side by side, item by item, until it matches." },
              { title: "Playtest", text: "Bot and real play, before the next round." },
            ],
          },
        ],
      },
    ],
    result: [
      "A playable PC build, with two settings (Pedro Velho and a downtown LAN house), a day-night cycle, monthly bills, and the complete Pingado Pro.",
      "Next steps: a Northeastern Brazilian accent for the voices, balancing the economy over several months, and an executable build for playtests with players.",
    ],
    tools: ["Godot 4", "GDScript", "Claude Code", "Kokoro (voices)", "OpenStreetMap", "Street View (reference)"],
  },
  {
    slug: "pje",
    title: "PJe2 Mobile",
    category: "UI/UX · Mobile app",
    year: "2024",
    client: "TRF5 — Brazil's Federal Regional Court, 5th Region",
    image: publicUrl("projects/pje2-mobile/cover.webp"),
    ogImage: "og-pje.jpg",
    accent: "#178f86",
    platform: "Mobile app (Flutter)",
    featured: true,
    engagement: "Voluntário",
    role: "UI/UX Designer (volunteer)",
    summary:
      "Interface redesign of the app that federal judges use to review and sign draft rulings. I worked as a volunteer designer, invited by a member of the residency team at TRF5 (Brazil's Federal Regional Court, 5th Region).",
    credits:
      "The project was run by a residency team linked to TRF5, which was responsible for refactoring the Flutter code, the new architecture, and the integration with the API of the CNJ (Brazil's National Council of Justice). A team member invited me to design the interface and the user experience, and my collaboration is recorded in his thesis. Names and CPF numbers (Brazilian taxpayer IDs) that appeared on the screens were blurred.",
    problem:
      "PJe2 Mobile already existed, but the legacy version was hard to use and hard to maintain. Navigation relied on a hidden drawer menu, filters accepted only one option at a time, and errors appeared in dialogs that interrupted the flow.",
    overview: {
      challenge:
        "Make the work of reviewing and signing draft rulings on a phone faster and safer, in a legacy app with hidden navigation, limited filters, and errors that interrupted the flow.",
      contribution:
        "As a volunteer, I designed the interface: login and pairing, home screen, case list and filters, bulk actions, draft ruling, and the components, within the Judiciary's visual standards.",
      outcome:
        "The team implemented the new interface in the version of the app presented in the thesis in September 2024. In a screen-by-screen comparison, the main tasks now take about half the interactions.",
    },
    metrics: [
      { value: "~50%", label: "fewer interactions in the main tasks, in a screen-by-screen comparison of the legacy app and the new one" },
      { value: "347", label: "code analyzer warnings and hints (67 and 280) resolved by the engineering team" },
    ],
    metricsNote:
      "The first figure is my own estimate, made by counting the interactions each task needed on the old and new screens, without user testing. The second comes from the thesis and is the result of the engineering team's refactor.",
    sections: [
      {
        label: "Context",
        title: "A work app for people who sign dozens of cases a day",
        text: [
          "PJe2 Mobile is the app federal judges use to review, check, and sign draft rulings away from the computer. When you go through dozens of cases, every extra tap adds up.",
          "The team started with a technical analysis document: use cases, requirements, and a code review that flagged 67 warnings and 280 hints. That analysis surfaced the navigation and flow problems the new interface needed to solve.",
        ],
        boards: [
          {
            kind: "grid",
            paper: true,
            uniform: true,
            contain: true,
            columns: 3,
            figures: [
              pjeImg(1, "The team's method: analysis of the current app, study of solutions, design and prototype, implementation"),
              pjeImg(3, "Login flowchart: first access, biometrics, authentication, and pairing"),
              pjeImg(2, "Layered architecture (view, controller, and model) adopted by the team in the refactor"),
            ],
          },
        ],
      },
      {
        label: "Before and after",
        title: "The old app took twice the taps",
        text: [
          "Comparing the screens, almost every task in the legacy app took twice the interactions: opening a menu to reach another screen, confirming things that didn't need confirming, switching tabs to piece together information about the same case. The redesign cut those steps one by one.",
          "The roughly 50% reduction comes from that comparison, task by task, between the old and new screens. There was no user testing; the thesis itself lists usability testing as the next step.",
        ],
        boards: [
          {
            kind: "compare",
            phone: true,
            labels: ["Legacy app", "New interface"],
            before: { src: publicUrl("projects/pje2-mobile/antes-inicio.webp"), caption: "Old home screen: a grid of buttons, with everything else hidden in the drawer menu" },
            after: pjeImg(9, "New home screen: location at the top and a pending-items counter"),
          },
          {
            kind: "compare",
            phone: true,
            labels: ["Legacy app", "New interface"],
            before: { src: publicUrl("projects/pje2-mobile/antes-lista.webp"), caption: "Old list: one filter at a time, in a strip you had to swipe" },
            after: pjeImg(17, "New list: combined filters, plus status and favorite on every case"),
          },
          {
            kind: "steps",
            steps: [
              { title: "See what's pending", text: "Before: open the list to find out whether there were cases to sign. After: the counter shows on the home screen." },
              { title: "Switch court", text: "Before: open the drawer menu, go to the profile and pick the location. After: tap the location at the top of the home screen and pick." },
              { title: "Filter the list", text: "Before: one filter at a time, in a strip you had to swipe. After: several options checked at once, in a panel." },
              { title: "Read a case", text: "Before: switch between three tabs (ruling, details and documents). After: details and documents on the same page, with a button straight to the draft." },
              { title: "Save the draft", text: "Before: save, confirm in a dialog and read the notice. After: save and read the notice." },
              { title: "Fix a login error", text: "Before: an error dialog you had to close. After: the CPF field flags the error as you type." },
            ],
          },
        ],
      },
      {
        label: "Access",
        title: "Signing in fast, without giving up security",
        text: [
          "Login became a short flow: the app identifies the user by CPF, validates the field as they type, and offers biometrics. When the account requires a second factor, the code goes on its own screen. Pairing with PJe Web got an illustrated step-by-step guide for generating the QR code.",
        ],
        boards: [
          {
            kind: "phones",
            steps: true,
            figures: [
              pjeImg(4, "Identification by CPF"),
              pjeImg(5, "Password, with the biometrics option"),
              pjeImg(7, "Two-factor authentication code"),
              pjeImg(6, "QR code pairing, with instructions"),
            ],
          },
        ],
      },
      {
        label: "Navigation",
        title: "The home screen shows everything at once",
        text: [
          "The drawer menu is gone. The court division where the judge is working always stays visible at the top and can be switched with one tap, without leaving the screen. The work shortcuts (drafting, judge's acts, document preparation, appellate decisions, and case search) became a direct list, with counters for pending items.",
          "Help, tags, and sign-out are in a settings menu, and signing out asks for confirmation.",
        ],
        boards: [
          {
            kind: "phones",
            figures: [
              pjeImg(9, "Home screen: court division at the top and shortcuts with counters"),
              pjeImg(32, "Switching court divisions without leaving the screen"),
              pjeImg(33, "Settings menu"),
              pjeImg(36, "Confirmation before signing out"),
            ],
          },
        ],
      },
      {
        label: "Case list",
        title: "Reading the case queue at a glance",
        text: [
          "In the list, each case shows the date, the type of act, and its status through a few visual cues. Filters now accept several options at once, with a counter showing how many are active, and selection gained gesture shortcuts: press and hold, or drag.",
          "With cases selected, bulk signing, checking, and favoriting sit in the top bar.",
        ],
        boards: [
          {
            kind: "anatomy",
            image: publicUrl("projects/pje2-mobile/17.webp"),
            alt: "PJe2 Mobile case list with numbered markers",
            points: [
              { x: 66, y: 8.3, label: "Counter", text: "How many cases are in the list." },
              { x: 92, y: 13.5, label: "Search", text: "Always at the top, without opening another screen." },
              { x: 34, y: 19, label: "Quick filter", text: "Shows the active filter and, when there is more than one, how many (+1, +2)." },
              { x: 84, y: 19, label: "Filter panel", text: "Several options at once: incumbent, substitute, urgent, confidential, checked, favorites." },
              { x: 76, y: 35, label: "Checked", text: "Marks a case that has already been checked." },
              { x: 82, y: 28.5, label: "Favorite", text: "Favorite right from the list, without opening the case." },
              { x: 4, y: 82, label: "Status bar", text: "Teal in the normal flow, red when the act is urgent." },
            ],
          },
          {
            kind: "phones",
            figures: [
              pjeImg(39, "Filters with several options selected"),
              pjeImg(18, "Active filter with counter (+1) and partial selection"),
              pjeImg(40, "Bulk selection: sign, check, and favorite in the top bar"),
            ],
          },
        ],
      },
      {
        label: "Case and draft ruling",
        title: "Sensitive actions with a layer of protection",
        text: [
          "In the case view, tags, details, and documents read as one, and the actions (sign, check, favorite, tags, and reminders) are grouped in a menu.",
          "The draft ruling opens in read mode, with a gray background, and only becomes editable after an explicit action. Signing asks for confirmation, and saving shows a notice on screen.",
        ],
        boards: [
          {
            kind: "phones",
            figures: [
              pjeImg(41, "Case details, with tags and documents"),
              pjeImg(44, "Case actions menu"),
              pjeImg(42, "Draft ruling in read mode"),
              pjeImg(43, "Notice after saving"),
            ],
          },
        ],
      },
      {
        label: "Components",
        title: "Reusable pieces, to the Judiciary's standard",
        text: [
          "The screens follow the colors of the PDPJ-Br visual identity and the typography and icons of the UIKit PJe. The mockups were made in Adobe XD and later migrated to Figma. Every element that repeats in the app became a component, with its states: case card, filter chips, selection bar, dialogs, and menus.",
        ],
        boards: [
          {
            kind: "grid",
            paper: true,
            uniform: true,
            contain: true,
            columns: 3,
            figures: [
              pjeImg(19, "Urgent case card, with tags"),
              pjeImg(20, "Selected card"),
              pjeImg(23, "Filter chip with counter"),
              pjeImg(26, "Bulk selection bar"),
              pjeImg(27, "Signing dialog"),
              pjeImg(12, "Sign-out dialog"),
              pjeImg(22, "Filter panel"),
              pjeImg(30, "Actions menu"),
              pjeImg(11, "Settings menu"),
            ],
          },
        ],
      },
    ],
    result: [
      "The team implemented the new interface in the new version of the app, with biometric login, guided pairing, combined filters, and more direct bulk signing. When the thesis was presented in September 2024, that version was not yet in production.",
      "In the thesis acknowledgments, the author thanks me “for the ideas that lit up this project” (my translation).",
      "Results for the project as a whole, not just my part: the code was reorganized into layers (an adapted MVC, with the Service and Repository patterns), state moved to BLoC, and the 347 analyzer warnings and hints were resolved.",
      "As next steps, the thesis recommends usability testing and broader automated test coverage.",
    ],
    tools: ["Adobe XD", "Figma", "Illustrator", "Photoshop"],
    links: [
      {
        label: "Read the thesis with the full study (in Portuguese)",
        url: "https://docs.google.com/document/d/e/2PACX-1vQotRMSwYoOB3EgNSNWMB_PHTUKnb4sbBtSBmYNj5Qsg1PXLu20ELZCw1H45K7SPAVLKyvEhHUUw2u5/pub",
      },
      {
        label: "TRF1 news article about PJe Mobile 2 (in Portuguese)",
        url: "https://www.trf1.jus.br/trf1/noticias/novo-aplicativo-para-dispositivos-moveis-do-pje-facilitara-consulta-e-trara-novas-funcionalidades-",
      },
    ],
    galleryPhones: true,
    gallery: [34, 35, 38, 13, 14, 15, 16, 8].map((n) => publicUrl(`projects/pje2-mobile/${n}.webp`)),
  },
  {
    slug: "jovem-potiguar",
    title: "Jovem Potiguar",
    category: "UX/UI · Registration platform",
    year: "2024",
    client: "IFRN and SETHAS — State Government of Rio Grande do Norte",
    image: publicUrl("projects/jovem-potiguar/cover.webp"),
    ogImage: "og-jovem-potiguar.jpg",
    accent: "#5e2a86",
    platform: "Web platform",
    featured: true,
    engagement: "Voluntário",
    role: "UI/UX Designer (volunteer)",
    summary:
      "A registration platform that takes young people listed in CadÚnico (Brazil's registry of low-income families) into vocational training courses at IFRN (Federal Institute of Rio Grande do Norte). As a volunteer, I designed the registration flow, from the user journey to the accessibility test.",
    credits:
      "The program is a partnership between IFRN and SETHAS (Rio Grande do Norte's state labor and social welfare department). I worked as a volunteer on the design of the registration platform.",
    problem:
      "The audience is low-income young people, many of them on basic phones and with little experience using government systems. If registration gets stuck, they lose their spot.",
    overview: {
      challenge:
        "Get young people from CadÚnico, many with basic phones and little experience using government systems, through pre-registration for IFRN courses without getting stuck along the way.",
      contribution:
        "As a volunteer, I designed the registration platform: journey, flowchart, wireframes, usability tests, visual guide, final screens, and accessibility review.",
      outcome:
        "The platform was used for the program's registrations. In one edition, IFRN opened 840 spots in vocational training courses through Jovem Potiguar.",
    },
    metrics: [
      { value: "840", label: "spots in vocational training courses in one edition of the program" },
      { value: "9", label: "process stages, from the user journey to the accessibility test" },
      { value: "AA · AAA", label: "contrast levels passed in the palette test" },
    ],
    metricsNote: "The 840 spots come from IFRN's news article. The stages and the contrast test are documented in the boards below.",
    sections: [
      {
        label: "Process",
        title: "Nine stages, from journey to accessibility",
        text: ["Each stage produced a deliverable used by the next one."],
        boards: [
          {
            kind: "steps",
            steps: [
              { title: "User journey", text: "The paths of people entering the platform, including the ones that end in an error." },
              { title: "User prototype", text: "Low-fidelity screens linked together, from the course list to the confirmation." },
              { title: "Flowchart", text: "Every registration decision, with the program's rules annotated." },
              { title: "Wireframe", text: "Registration split into short steps, with instructions along the way." },
              { title: "Usability test", text: "Reports from an earlier SETHAS project and tests with people who hadn't seen the prototype." },
              { title: "UI mood board", text: "References from gov.br and other public services the audience already uses." },
              { title: "Style guide", text: "Palette, components, and program notices, on light and dark backgrounds." },
              { title: "Mockups", text: "The final screens, from the home page to the pre-registration form." },
              { title: "Accessibility test", text: "A contrast review with color blindness and low vision in mind, before publishing." },
            ],
          },
        ],
      },
      {
        label: "Research",
        title: "Where could people get stuck?",
        text: [
          "The starting point was the user journey, including the paths that end in an error: an age outside the program's range, a CPF (Brazilian taxpayer ID) that isn't in CadÚnico, or a duplicate pre-registration. Then came the flowchart, with the program's rules annotated screen by screen, and a low-fidelity prototype linking the screens.",
          "The selection process behind the platform, from the SETHAS database to the list of students sent to IFRN, was also mapped.",
        ],
        boards: [
          { kind: "grid", ink: true, columns: 1, figures: [jpImg(13, "User journey: from the course list to email confirmation, with the error paths")] },
          { kind: "grid", paper: true, columns: 1, figures: [jpImg(1, "Flowchart from the home screen to pre-registration, with the business rules annotated")] },
          {
            kind: "grid",
            ink: true,
            columns: 2,
            figures: [
              jpImg(16, "Low-fidelity prototype: course list, information, pre-registration, and confirmation"),
              jpImg(15, "Map of the student selection process, from SETHAS to IFRN"),
            ],
          },
        ],
      },
      {
        label: "Wireframes",
        title: "From wireframe to final screen",
        text: [
          "Registration was split into short steps, with instructions along the way, so no one has to guess what to do next. On the course page, the information comes first and the pre-registration form sits right below it, in a single read.",
        ],
        boards: [
          {
            kind: "compare",
            before: jpImg(6, "Course page wireframe"),
            after: jpImg(17, "Course page with the pre-registration form"),
          },
          {
            kind: "grid",
            uniform: true,
            contain: true,
            columns: 2,
            figures: [
              jpImg(4, "Course list wireframe"),
              jpImg(2, "Filters by class time, field, and municipality"),
              jpImg(14, "Modal to look up the applicant's card"),
              jpImg(8, "Data confirmation modal"),
            ],
          },
        ],
      },
      {
        label: "Visual guide",
        title: "The program's colors, with the look of a public service",
        text: [
          "The mood board started from public services the audience already knows, such as gov.br, so the platform would feel familiar. The visual guide brought together the program's palette and the components, such as the pre-registration card and the notices, on light and dark backgrounds.",
        ],
        boards: [
          { kind: "palette", colors: ["#582D7E", "#B54880", "#DCCA36", "#16BB74", "#A28DB0", "#BCA6C1", "#E0D4A4", "#C6C8CD", "#F5F5F7"] },
          {
            kind: "grid",
            columns: 2,
            figures: [jpImg(10, "Mood board with gov.br references"), jpImg(7, "Pre-registration card, notices, and palette")],
          },
          {
            kind: "grid",
            columns: 2,
            figures: [jpImg(3, "Home screen with the cycle schedule"), jpImg(11, "Home screen on a dark background")],
          },
        ],
      },
      {
        label: "Accessibility",
        title: "Contrast tested before publishing",
        text: [
          "Before publishing, the screens went through a contrast review with color blindness and low vision in mind. In the palette test over the home screen, the combination evaluated passed at the AA and AAA levels.",
        ],
        boards: [{ kind: "grid", ink: true, columns: 1, figures: [jpImg(12, "Contrast test of the palette over the home screen")] }],
      },
    ],
    result: [
      "The platform was used for the program's registrations. In one edition, IFRN opened 840 spots in vocational training courses through Jovem Potiguar.",
    ],
    learnings: [
      "Using UX to bring what the institution wants closer to what the audience can actually do.",
      "Running usability tests to catch problems early.",
      "Accessibility matters even in forms that seem simple.",
    ],
    tools: ["Figma", "Adobe XD", "Photoshop"],
    links: [
      { label: "Program page (FUNCERN, in Portuguese)", url: "https://funcern.br/projetos/programa-jovem-potiguar/" },
      {
        label: "IFRN news: 840 spots (in Portuguese)",
        url: "https://portal.ifrn.edu.br/campus/reitoria/noticias/jovem-potiguar-abertas-as-inscricoes-para-840-vagas-em-cursos-de-qualificacao-no-rn/",
      },
    ],
  },
  {
    slug: "my-treasure",
    title: "MyTreasure",
    category: "Product Design · Social app",
    year: "2022–2023",
    client: "Dione Solutions (Tokyo, Japan)",
    image: publicUrl("projects/my-treasure/cover.webp"),
    ogImage: "og-my-treasure.jpg",
    accent: "#c9973a",
    platform: "Mobile app (Android)",
    featured: true,
    role: "Product Designer",
    summary:
      "A social network for collectors: each person logs their items, tracks the value of their collection, and can showcase, auction, or trade pieces. I designed the product and the logo proposals.",
    problem:
      "Every collector wants to show something different. Some want to track their collection's value privately; others want a public showcase with bids.",
    overview: {
      challenge:
        "Every collector wants to show something different: some track their collection's value privately, others want a public showcase with bids. The app had to serve both without turning into two products.",
      contribution:
        "I defined the usage modes, designed the feed, auction, negotiation chat, and profile screens, and proposed the brand: an M shaped like a jewel, with variations in gold, silver, and white.",
      outcome: "The app was published on Google Play at one point. It is no longer available in the store.",
    },
    sections: [
      {
        label: "Concept",
        title: "A showcase for collections, with or without the value on display",
        text: [
          "The app is a social network with an interactive feed. Each user logs their items, and the sum of their value becomes the profile's value, which feeds a ranking among collectors. Each post is configurable: you can hide the price, put the piece in a public showcase, or open an auction with bids.",
          "The visual concept started from the idea of exclusivity: black, gold, and magazine-style photography. The project's working name was MyTreasure; in the presentation slides, the app appears as Prism.",
        ],
        boards: [
          {
            kind: "grid",
            ink: true,
            columns: 2,
            figures: [
              { src: prism2, caption: "Concept: shared passions and exclusivity" },
              { src: prism6, caption: "Appraised collection: the items' value becomes the profile's value" },
            ],
          },
        ],
      },
      {
        label: "Brand",
        title: "One symbol, eight combinations",
        text: [
          "I proposed a symbol that combines the letter M with a jewel, with a sparkle in the corner. I tested the symbol in gold, silver, and white on graphite, and in graphite on gold, with and without the full name, with the app icon and dark screens in mind.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 4,
            figures: [
              mtLogo(1, "Gold on graphite, with name"),
              mtLogo(2, "Silver on graphite, with name"),
              mtLogo(3, "White on graphite, with name"),
              mtLogo(4, "Graphite on gold, with name"),
              mtLogo(5, "Gold, symbol only"),
              mtLogo(6, "Silver, symbol only"),
              mtLogo(7, "White, symbol only"),
              mtLogo(8, "Graphite on gold, symbol only"),
            ],
          },
        ],
      },
      {
        label: "Screens",
        title: "From feed to auction",
        text: [
          "The public post shows the piece, the highest bids, the time remaining, and the comments. Whoever receives a bid negotiates in the chat and decides right there whether to sell or keep the offer. The bid history is open, and the profile shows the collection's net worth and shortcuts to my bids and bids received.",
        ],
        boards: [
          {
            kind: "grid",
            ink: true,
            columns: 2,
            figures: [
              { src: prism1, caption: "Public post in auction mode: highest bids, time remaining, and comments" },
              { src: prism5, caption: "Negotiation chat: sell or keep the offer" },
              { src: prism7, caption: "Bid history open to everyone" },
              { src: prism9, caption: "Profile with net worth, my bids, and bids received" },
              { src: prism4, caption: "Login" },
              { src: prism8, caption: "Search" },
            ],
          },
        ],
      },
    ],
    result: [
      "The app was published on Google Play at one point; it is no longer available in the store.",
      "A brand with eight color combinations, designed for the app icon and dark screens.",
    ],
    tools: ["Figma"],
  },
  {
    slug: "hosuto",
    title: "Hosuto — hotel management",
    category: "Product Design · Dashboard",
    year: "2022–2023",
    client: "Dione Solutions (Tokyo, Japan)",
    image: hosuto,
    featured: false,
    role: "Product Designer (design system)",
    summary: "Design system and screens for a hotel management system (PMS) built by Dione Solutions for a chain of 12 hotels: bookings, housekeeping, kitchen, and inventory. Hosuto is a placeholder name; the system's real name is protected by contract.",
    problem:
      "Hotel work is hands-on and hectic. The digital tool had to help without getting in the way: information that's easy to read and organized around what each team needs to see.",
    accent: "#ea580c",
    overview: {
      challenge: "Hotel work is hands-on and fast-paced. The tool had to help without getting in the way, showing each team only what it needs to see.",
      contribution: "I defined the design system and designed the main screens: the room occupancy calendar, the booking list and guest registration, and the kitchen and inventory modules.",
      outcome: "I delivered the design system and the main screens. I left Dione in May 2023, before implementation was finished, so I have no usage numbers to show.",
    },
    sections: [
      {
        label: "Context",
        title: "A dashboard for a hotel's daily routine",
        text: [
          "Hotel work is hands-on and fast-paced. The tool had to help without getting in the way: information that's easy to read, organized around what each team needs to see.",
          "The system was built by Dione, a Tokyo tech company where I worked remotely. My part was the design system (colors, typography, and components) and the main screens.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 1,
            figures: [
              { src: publicUrl("projects/hosuto/1.webp"), caption: "Opening slide of the project presentation" },
            ],
          },
        ],
      },
      {
        label: "Calendar",
        title: "Who's in each room, day by day",
        text: [
          "The core screen is an occupancy calendar: each row is a room, each bar is a booking, and the color shows its stage (assigned, awaiting check-in, checked in, checking out, or checked out). The team called this view Room Tetris: fitting bookings into free rooms, like pieces.",
          "The top bar holds filters by room category, month and year navigation, and hotel and language selectors for people who manage more than one property.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 1,
            figures: [
              { src: publicUrl("projects/hosuto/calendario-xd.webp"), caption: "Occupancy calendar in the working file, in Adobe XD (2023). Guest names are fictional." },
            ],
          },
          {
            kind: "grid",
            columns: 2,
            figures: [
              { src: publicUrl("projects/hosuto/2.webp"), caption: "The calendar in the presentation, with clean, dirty, and under-maintenance rooms" },
              { src: publicUrl("projects/hosuto/3.webp"), caption: "The calendar on a tablet" },
            ],
          },
        ],
      },
      {
        label: "Bookings",
        title: "From the schedule to the guest record",
        text: [
          "Besides the calendar, bookings appear in a list with each stay's details, and guest registration brings documents, contact info, and notes into a single form.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 2,
            figures: [
              { src: publicUrl("projects/hosuto/5.webp"), caption: "Bookings as a list" },
              { src: publicUrl("projects/hosuto/7.webp"), caption: "Guest registration" },
            ],
          },
        ],
      },
      {
        label: "Operations",
        title: "Kitchen and inventory in the same dashboard",
        text: [
          "The kitchen and inventory modules use the same components. Restaurant orders arrive as notifications, with shortcuts to the menu, orders, and inventory.",
        ],
        boards: [
          {
            kind: "grid",
            columns: 2,
            figures: [
              { src: publicUrl("projects/hosuto/8.webp"), caption: "Kitchen: orders and menu" },
              { src: publicUrl("projects/hosuto/9.webp"), caption: "Inventory" },
            ],
          },
        ],
      },
    ],
    result: [
      "Design system and main screens delivered to the development team.",
      "I left Dione in May 2023, before implementation was finished. That's why this case shows the design, not usage results.",
      "Internal system with no public access. Hosuto is a placeholder name, used for contractual reasons.",
    ],
    tools: ["Adobe XD", "Figma"],
  },
  {
    slug: "hex-labs",
    title: "Hex Labs",
    category: "Company I founded",
    year: "2026",
    client: "Hex Labs",
    engagement: "Fundador",
    role: "Founder",
    summary:
      "A digital product studio built around AI, founded in 2026. I lead design, development, and client prospecting, and I build our own products to show what the studio delivers: Rede Imobiliária and Lexus System.",
    problem:
      "A new studio has to prove what it can do. Instead of waiting for the first client, I built complete products and use each one as a showcase.",
    process: [
      {
        title: "Company website and CMS",
        text: "I built the Hex Labs website and CMS in React, TypeScript, Tailwind, and Supabase, with a blog and an admin panel.",
      },
      {
        title: "Rede Imobiliária (Nexus Imobiliária)",
        text: "A white-label SaaS for real estate agencies, with AI-generated property descriptions: a dashboard for agents to add and edit listings, map-based search for the public, listing analytics, and team permission controls. The full case study is on the Nexus Imobiliária page.",
        images: [nexusImg(31, "Agent dashboard"), nexusImg(18, "Map search")],
      },
      {
        title: "Lexus System (formerly EcoLaw)",
        text: "A management system for law firms: case tracking, deadlines, fees, and a client portal. Still in development.",
      },
    ],
    result: [
      "Rede Imobiliária is built and documented as a case study.",
      "Lexus System is in development.",
      "I work on every front: research, design, code, and relationships with potential clients.",
    ],
    tools: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Figma"],
    links: [{ label: "Case study: Nexus Imobiliária", url: "/projects/nexus-imobiliaria" }],
  },
  {
    slug: "nexus-imobiliaria",
    title: "Nexus Imobiliária",
    category: "Hex Labs product · Research, design, and code",
    year: "2026",
    client: "Hex Labs (own product)",
    image: publicUrl("projects/nexus-imobiliaria/hero.webp"),
    featured: true,
    engagement: "Fundador",
    role: "Founder of Hex Labs: design and development",
    summary:
      "A real estate platform with a dashboard for agents and map-based search for the public. It is Rede Imobiliária, the white-label SaaS I'm developing at Hex Labs.",
    problem:
      "Agents of all ages need to add and update listings without relying on someone from IT. On the other side, people looking for a property want to see the location and the surroundings without getting lost in too much information.",
    accent: "#2563eb",
    overview: {
      challenge: "Real estate agents of all ages need to list and update properties without relying on a tech person; home seekers want to see the location and surroundings without drowning in information.",
      contribution: "Research and journeys, personas, the agent dashboard, team permission levels, map search and the build in Next.js and Supabase.",
      outcome: "A product built end to end, from research to code, as a showcase for Hex Labs.",
    },
    process: [
      {
        title: "Research and journey",
        text: "The work started with the journey of people who buy or rent and of people who list properties. Then came the prototype and the flowchart of how the interfaces connect.",
        images: [nexusImg(11, "Work process"), nexusImg(26, "User journey"), nexusImg(21, "Flowchart")],
      },
      {
        title: "Personas",
        text: "Three personas guided the design: Márcia, a real estate agent; Karla, who is looking for an apartment; and Pablo, who wants to rent out his house. Since the other two depend on Márcia's work, the design started with her dashboard.",
      },
      {
        title: "The agent's dashboard",
        text: "Adding a listing is the agent's most frequent task, so the new listing button is the focal point of the dashboard. The listing form has an ad preview, edits go live on save, and the analytics page shows times, devices, and the most-viewed properties.",
        images: [nexusImg(31, "Dashboard"), nexusImg(20, "Adding a listing"), nexusImg(14, "Analytics")],
      },
      {
        title: "Team and permissions",
        text: "Three access levels: staff (sees performance and suggests edits), agent (also manages listings), and manager (also adds team members). A history shows each person's latest actions.",
        images: [nexusImg(19, "Team"), nexusImg(13, "History")],
      },
      {
        title: "Search for the public",
        text: "Search shows up right at the entrance of the site. Results come with a map of where the properties are, and the property page leads straight to the agent's WhatsApp.",
        images: [nexusImg(7, "Search"), nexusImg(18, "Map"), nexusImg(30, "Property page")],
      },
    ],
    result: [
      "A product built end to end, from research to code, as a Hex Labs showcase.",
    ],
    tools: ["Figma", "Photoshop", "Next.js (App Router)", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion", "Leaflet", "Recharts"],
    gallery: [17, 22, 4, 32, 16].map((n) => publicUrl(`projects/nexus-imobiliaria/image${n}.webp`)),
  },
];
