# Utiliser une image Node.js légère basée sur Alpine
FROM node:lts-alpine

# Créer le répertoire d'application
RUN mkdir /app
WORKDIR /app

# Copier le fichier package.json et installer les dépendances
COPY package.json ./
RUN yarn install
RUN yarn global add ts-node

# Installer curl (utile pour les tests de santé ou autres requêtes)
RUN apk --update --no-cache add curl

# Copier le code source et les fichiers nécessaires
COPY src ./src
COPY tsconfig.json tsconfig.json

# Exposer le port sur lequel votre application s'exécute
EXPOSE 4005

# Commande de démarrage
CMD ["yarn", "start"]