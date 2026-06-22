# Galsen Streak

GitHub streak badge à la sénégalaise 🇸🇳

## Usage

```md
![Galsen Streak](https://galsen-streak.vercel.app/streak/USERNAME)
```

**Exemple :**

[![Galsen Streak](https://galsen-streak.vercel.app/streak/torvalds)](https://galsen-streak.vercel.app/streak/torvalds)

### Sans graphique

```md
![Galsen Streak](https://galsen-streak.vercel.app/streak/USERNAME?hide_graph=true)
```

## Fonctionnalités

- Streak actuel et record
- Total des contributions
- Graphique des 30 derniers jours (optionnel)
- Thème Sénégal (vert, jaune, rouge)
- Animations fluides
- Cache 1h

## Installation

```bash
git clone https://github.com/alphajoop/galsen-streak.git
cd galsen-streak
bun install

echo "GITHUB_TOKEN=your_token_here" > apps/api/.env

bun run dev
```

## Tech Stack

- Bun
- Hono
- React + Vite + Tailwind CSS v4
- TypeScript
- GitHub GraphQL API

## License

MIT
