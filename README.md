# CI-CD To-Do

**Développé par :** ALBAN Mathis, MASSACRY Audran, REY Florian

---

## Prérequis

- [Node.js 22+](https://nodejs.org/)
- [Docker](https://www.docker.com/) & Docker Compose
- [Git](https://git-scm.com/)


## Installation

```bash
git clone https://github.com/palmer-dev/to-do-final.git
cd to-do-final
npm install
```


## Lancement en développement

> Nécessite une base de données PostgreSQL accessible (voir variable `DATABASE_URL`).

1. Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:prisma@localhost:5432/postgres"
PORT=3000
```

2. Appliquer les migrations et démarrer le serveur :

```bash
npm run db:deploy
npm run dev
```

L'API est disponible sur `http://localhost:3000`.


## Lancement avec Docker (production)

1. Créer un fichier `.env.prod` à la racine :

```env
DATABASE_URL="postgresql://postgres:prisma@postgres:5432/postgres"
PORT=3000
```

2. Démarrer les services :

```bash
docker compose up --build
```

L'API est disponible sur `http://localhost:3000`.

> Le conteneur `server` attend automatiquement que PostgreSQL soit prêt avant de démarrer (healthcheck).


## Scripts disponibles

| Commande            | Description                                  |
|---------------------|----------------------------------------------|
| `npm run dev`       | Démarrage en mode développement (hot-reload) |
| `npm run build`     | Compilation TypeScript → `dist/`             |
| `npm run start`     | Démarrage en production (depuis `dist/`)     |
| `npm run lint`      | Analyse statique ESLint                      |
| `npm test`          | Exécution des tests Jest                     |
| `npm run db:deploy` | Applique les migrations Prisma               |


## Routes de l'API

| Méthode  | Route        | Description                              |
|----------|--------------|------------------------------------------|
| `GET`    | `/health`    | État du serveur et de la base de données |
| `GET`    | `/tasks`     | Liste toutes les tâches                  |
| `POST`   | `/tasks`     | Crée une nouvelle tâche                  |
| `GET`    | `/tasks/:id` | Récupère une tâche par son ID            |
| `PUT`    | `/tasks/:id` | Met à jour une tâche                     |
| `DELETE` | `/tasks/:id` | Supprime une tâche                       |


## Tests

Les tests nécessitent une base de données PostgreSQL de test. Configurer la variable `DATABASE_URL` puis :

```bash
npm run db:deploy
npm test
```
