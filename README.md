# CV & Portfolio dynamique — Ennyo Bori

## 1. Présentation

Ce projet est mon CV / portfolio personnel, réalisé pour l'atelier **Yboost B1 Informatique** du 28 octobre 2026.

**Objectifs :**
- Créer un site responsive avec HTML, CSS et Bootstrap.
- Utiliser Git et GitHub pour enregistrer le travail.
- Publier automatiquement avec GitHub Actions et GitHub Pages (CI/CD).
- Afficher les projets et les expériences depuis une base Supabase.
- Pouvoir ajouter un projet dans Supabase sans modifier le HTML.

**Technologies :** HTML, CSS, Bootstrap 5, JavaScript, Git, GitHub Actions, GitHub Pages, Supabase (PostgreSQL).

## 2. Les fichiers

| Fichier | À quoi il sert |
| --- | --- |
| `index.html` | Le contenu du CV (menu, présentation, compétences, contact). |
| `style.css` | Les couleurs, les cartes et l'adaptation aux téléphones. |
| `script.js` | La connexion à Supabase et l'affichage automatique des projets/expériences. |
| `supabase.sql` | La création des tables et des règles de sécurité. |
| `.github/workflows/deploy.yml` | La mise en ligne automatique sur GitHub Pages. |
| `README.md` | Les explications du projet. |

## 3. Voir le site sur mon ordinateur

1. Ouvrir le dossier dans **Visual Studio Code**.
2. Installer l'extension **Live Server** si besoin.
3. Faire clic droit sur `index.html`, puis **Open with Live Server**.
4. Tant que Supabase n'est pas configuré, le site affiche des exemples de projets.

Il faut une connexion Internet pour charger Bootstrap et le SDK Supabase via CDN.

## 4. Créer ma base de données Supabase

1. Aller sur <https://supabase.com> et créer un compte.
2. Créer un nouveau projet, par exemple `portfolio-ennyo-bori`.
3. Aller dans **SQL Editor** > **New query**.
4. Ouvrir `supabase.sql`, copier tout son contenu dans l'éditeur, puis cliquer sur **Run**.
5. Aller dans **Table Editor**. Deux tables doivent apparaître : `projets` et `experiences`.
6. Pour ajouter une réalisation, ouvrir la table `projets` et cliquer sur **Insert row**.
7. Remplir `titre`, `description`, `categorie` (Web, École ou Personnel), `technologies`, `lien` (optionnel) et `ordre`. Laisser `id` automatique.

**Important :** ce SQL donne aux visiteurs le droit de lire uniquement les projets et expériences. Les modifications se font depuis le tableau de bord Supabase connecté au compte du propriétaire.

## 5. Connecter le site à Supabase

1. Dans Supabase, ouvrir **Project Settings / Connect** ou **Settings > API Keys** (selon l'interface).
2. Copier l'**URL du projet** et la **publishable key** (`sb_publishable_...`) ou l'ancienne clé publique `anon`.
3. Ouvrir `script.js` et remplacer les deux premières constantes :

```js
const SUPABASE_URL = "https://TON-PROJET.supabase.co";
const SUPABASE_KEY = "TA_CLE_PUBLIQUE";
```

4. Enregistrer le fichier et actualiser la page.
5. Les exemples du fichier JavaScript sont maintenant remplacés par les lignes de Supabase.

**Ne jamais utiliser la clé secrète `service_role` ou `sb_secret_...` dans du JavaScript public.** La clé publique est prévue pour être utilisée dans le navigateur **avec des règles RLS adaptées**.

## 6. Enregistrer mon code avec Git

Créer un dépôt GitHub **public**, vide, appelé par exemple `portfolio-ennyo-bori`. Ensuite, dans le terminal VS Code, dans le dossier du projet :

```bash
git init
git branch -M main
git add .
git commit -m "Création de mon portfolio"
git remote add origin https://github.com/TON-PSEUDO/portfolio-ennyo-bori.git
git push -u origin main
```

Remplacer `TON-PSEUDO` par mon identifiant GitHub. Si Git réclame une connexion, suivre les instructions de GitHub. Si je crée un dépôt avec un README déjà généré, je dois d'abord synchroniser l'historique ou recommencer avec un dépôt vide.

Pour publier une modification plus tard :

```bash
git add .
git commit -m "Mise à jour de mon portfolio"
git push
```

## 7. Activer GitHub Pages et le déploiement automatique

1. Dans le dépôt GitHub, ouvrir **Settings > Pages**.
2. Dans **Build and deployment > Source**, choisir **GitHub Actions**.
3. Le fichier `.github/workflows/deploy.yml` déclenche le déploiement à chaque `push` sur `main`.
4. Dans l'onglet **Actions**, vérifier que le workflow « Publier mon portfolio » se termine en vert.
5. L'URL du site sera, normalement : `https://TON-PSEUDO.github.io/portfolio-ennyo-bori/`.

Si les workflows ne se lancent pas, vérifier les autorisations GitHub Actions du dépôt. Pour l'hébergement gratuit d'un compte GitHub Free, le dépôt doit être **public**.

## 8. Test demandé pour le cours

1. Ouvrir l'URL du portfolio en ligne.
2. Dans Supabase, ouvrir la table `projets`.
3. Cliquer sur **Insert row** et ajouter par exemple :
   - `titre` : Mon nouveau projet
   - `description` : Un projet ajouté sans modifier le code HTML.
   - `categorie` : Web
   - `technologies` : HTML · CSS
   - `lien` : laisser vide
   - `ordre` : 3
4. Enregistrer dans Supabase.
5. Actualiser la page du portfolio : la nouvelle carte apparaît.

> Les données sont chargées **à chaque ouverture/actualisation**. Il ne s'agit pas d'une mise à jour instantanée sans recharger la page.

## 9. Ma petite explication pour l'oral

« J'ai créé un CV en ligne avec HTML pour la structure, CSS pour le design et Bootstrap pour qu'il s'adapte aux téléphones. J'ai ensuite mis mon code sur GitHub. Grâce à GitHub Actions, le site se publie automatiquement sur GitHub Pages quand j'envoie une modification. Enfin, j'ai utilisé Supabase pour stocker mes projets et mes expériences. JavaScript récupère les données de Supabase et les affiche sous forme de cartes. Cela me permet d'ajouter des projets sans modifier le HTML. »

## 10. Personnalisation avant de rendre

- Dans `index.html`, remplacer **`ton.adresse@exemple.com`** par ma vraie adresse email, ou supprimer le bouton de contact si je préfère.
- Vérifier que les expériences et les projets racontent bien mon parcours réel : les textes fournis sont des **exemples pédagogiques**.
- Ajouter un vrai lien `https://...` dans la colonne `lien` d'un projet si je veux afficher son bouton.
- Conserver le dépôt GitHub public seulement si je souhaite que le code et le CV soient visibles publiquement.
- Ne jamais publier de mot de passe ou de clé secrète.

## 11. Architecture du projet

```text
Visiteur (navigateur)
       |
       v
GitHub Pages ---> HTML + CSS + JavaScript
                         |
                         | clé publique + requêtes SELECT
                         v
                    Supabase
                 (base PostgreSQL)

Moi : VS Code --> git push --> GitHub Actions --> GitHub Pages
Moi : Supabase Table Editor --> modifier une ligne --> actualiser le site
```

## 12. Ce qui est livré / reste à activer

- [x] Site HTML / CSS responsive
- [x] Interface Bootstrap
- [x] Pages Projets et Expériences générées en JavaScript
- [x] Filtre par catégorie
- [x] Schéma SQL avec sécurité RLS de lecture
- [x] Workflow GitHub Actions
- [x] README
- [ ] Créer le vrai projet Supabase et ajouter ses clés publiques
- [ ] Envoyer le dépôt sur son propre compte GitHub
- [ ] Activer GitHub Pages et vérifier l'URL publique
- [ ] Remplacer les contenus d'exemple par des expériences personnelles vérifiées
