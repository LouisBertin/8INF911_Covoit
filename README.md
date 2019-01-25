Un site avec un front en [ReactJS](https://reactjs.org/) et un back-end en [NodeJS](https://nodejs.org/en/) :fire:

## Prérequis

* Installer [Git](https://tinyurl.com/ydg7nc6e)
* Installer NodeJS v10
* Installer MongoDB

Il est conseillé d'installer un GUI pour MongoDB comme [MongoDB Compass](https://www.mongodb.com/products/compass) 😉


⚠️ **IMPORTANT** : Dupliquer le fichier `config/config.js.dist` en `config/config.js` puis renseigner l'url de votre base mongoDB

## Installation

* Clonez ce dépôt
* À la raçine du projet, exécutez la commande suivante :
```bash
npm i
```
* Ensuite :
```bash
npm run client-install
```
* Enfin, cette commande permet de lancer le projet :
```
npm run dev
```

Voilà! Le site est accessible via l'url <http://localhost:3000/> :sunglasses:

## Ressources

* [MapBox API](https://www.mapbox.com/mapbox-gl-js/api)
* Installer un package npm pour le `client` :
````bash
npm run client-install -- nom_du_package
````
