# SCoPE

Landing page React + TypeScript de **SCoPE (Sorting & Collecting Plastics in our Environment)**, une solution togolaise dédiée à la collecte, au tri et au recyclage des déchets plastiques à Lomé.

## Stack

- React et TypeScript
- Vite
- Lucide React pour les icônes
- CSS responsive avec Google Fonts

## Développement

```bash
npm install
npm run dev
```

Le site est ensuite disponible sur l'URL affichée par Vite, généralement `http://localhost:5173`.

## Build de production

```bash
npm run build
npm run preview
```

## Structure

```text
scope_landing/
├── public/assets/       # Logo et capture de l'application
├── src/App.tsx          # Sections, contenu et interactions React
├── src/styles.css       # Design responsive
├── src/main.tsx         # Montage de l'application
├── package.json
└── vite.config.ts
```