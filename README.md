# xayma

## description

### en

**Xayma** is an open source experience sharing platform. Our goal is to enable companies to offer their customers the best services and improve to better meet their needs. You can integrate it quite easily into your website.

### fr

**Xayma** est une plateforme de partage d'expériences open source. Notre objectif est de permettre aux entreprises de proposer à leurs clients les meilleurs services et de s'améliorer pour mieux réponde aux besoins. Vous pouvez l'intégrer assez facilement dans votre site web.

## install

```bash
# yarn
yarn add xayma

# npm
npm i --save xayma
```

## import

```javascript
// browser
<script src="https://cdn.jsdelivr.net/npm/xayma@0.1.29/dist/main.min.js"></script>

<script>
  // initilize
  xayma.init(yourEntrepriseId);
</script>
```

```javascript
// node
import xayma from "xayma";

// initilize
xayma.init(yourEntrepriseId, language?: "en" | "fr);
```

['xaymaio.web.app']('https://xaymaio.web.app/')
