# 🔥 Galsen Streak

GitHub Streak à la sénégalaise avec un design moderne

## 🚀 Usage

### Basic

```md
![Galsen Streak](https://galsen-streak.vercel.app/streak/USERNAME)
```

**Exemple réel :**

![Galsen Streak](https://galsen-streak.vercel.app/streak/torvalds)

### Avec thème

```md
![Galsen Streak](https://galsen-streak.vercel.app/streak/USERNAME?theme=ocean)
```

### Sans graphique

```md
![Galsen Streak](https://galsen-streak.vercel.app/streak/USERNAME?hide_graph=true)
```

## 🎨 Thèmes disponibles

- `senegal` (défaut) - Drapeau sénégalais 🇸🇳
- `ocean` - Bleu océan profond 🌊
- `github` - Style GitHub officiel
- `sunset` - Coucher de soleil 🌅
- `forest` - Forêt verte 🌲

## 📊 Fonctionnalités

✅ Streak actuel et record  
✅ Total des contributions  
✅ Graphique des 30 derniers jours  
✅ 5 thèmes modernes  
✅ Animations fluides  
✅ Cache 1h  
✅ Design responsive

## 🛠️ Installation

```bash
# Cloner
git clone https://github.com/alphajoop/galsen-streak.git
cd galsen-streak

# Installer
bun install

# Config
echo "GITHUB_TOKEN=your_token_here" > .env

# Dev
bun run dev

# Build
bun run build
bun start
```

## 🧩 Tech Stack

- Bun.js
- Hono
- TypeScript strict
- SVG dynamique avec animations
- GitHub GraphQL API

## 📄 License

MIT
