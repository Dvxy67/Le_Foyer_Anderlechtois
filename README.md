# Le_Foyer_Anderlechtois

Ce dépôt contient la refonte du site web du Foyer Anderlechtois.

## Structure
- Les fichiers HTML/CSS se trouvent à la racine du projet.
- Le dossier `asset` regroupe les images et logos.
- Quelques fichiers PHP destinés à l'administration sont stockés dans `admin` et `includes` (actuellement vides).

Pour tester le site en local, ouvrez directement `home.html` dans votre navigateur. Aucune configuration PHP n'est requise pour la partie publique.

## Fonctionnalités
- Mode sombre : un bouton avec une icône lune permet d'activer un thème sombre. Le choix est mémorisé dans `localStorage`.
- Changement de langue (FR/EN) : le bouton "EN" ou "FR" traduit la navigation et certains textes.

Ces fonctionnalités sont implémentées en JavaScript dans `main.js` et peuvent être étendues à d'autres pages.
