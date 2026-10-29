// ------------------------------------------------------------
// 1. Connexion à Supabase
// Colle ici l'URL et la clé PUBLIQUE de ton projet Supabase.
// Ne mets JAMAIS de clé secrète ou service_role ici !
// ------------------------------------------------------------
const SUPABASE_URL = "COLLE_ICI_TON_URL_SUPABASE";
const SUPABASE_KEY = "COLLE_ICI_TA_CLE_PUBLIQUE";

// ------------------------------------------------------------
// 2. Petites données de démonstration
// Elles s'affichent tant que Supabase n'est pas connecté.
// Ces exemples ne sont pas de vraies expériences professionnelles.
// ------------------------------------------------------------
const projetsDemo = [
  {
    titre: "Mon portfolio dynamique",
    description: "Création d'un CV en ligne avec HTML, CSS, Bootstrap, JavaScript et une base Supabase.",
    categorie: "Web",
    technologies: "HTML · CSS · Bootstrap · JavaScript",
    lien: ""
  },
  {
    titre: "Première page responsive",
    description: "Exercice d'apprentissage : adapter une page web à l'écran d'un ordinateur ou d'un téléphone.",
    categorie: "École",
    technologies: "HTML · CSS · Bootstrap",
    lien: ""
  }
];

// Liste que nous allons afficher dans le site.
let projets = [];

// ------------------------------------------------------------
// 3. Création des cartes avec JavaScript
// textContent sert à afficher du texte sans interpréter du HTML.
// ------------------------------------------------------------
function afficherProjets() {
  const zone = document.getElementById("liste-projets");
  const filtre = document.getElementById("filtre-projets").value;
  zone.innerHTML = "";

  const projetsFiltres = projets.filter(function (projet) {
    return filtre === "Tous" || projet.categorie === filtre;
  });

  if (projetsFiltres.length === 0) {
    zone.innerHTML = '<p class="empty-message">Aucun projet dans cette catégorie.</p>';
    return;
  }

  projetsFiltres.forEach(function (projet) {
    const colonne = document.createElement("div");
    colonne.className = "col-md-6";
    colonne.innerHTML = `
      <article class="project-card">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="project-symbol">&lt;/&gt;</div>
          <span class="project-category"></span>
        </div>
        <h3></h3>
        <p class="project-description mt-2"></p>
        <div class="project-tools"></div>
        <a class="project-link" target="_blank" rel="noopener noreferrer">Voir le projet ↗</a>
      </article>
    `;

    colonne.querySelector(".project-category").textContent = projet.categorie || "Autre";
    colonne.querySelector("h3").textContent = projet.titre || "Projet sans titre";
    colonne.querySelector(".project-description").textContent = projet.description || "";
    colonne.querySelector(".project-tools").textContent = projet.technologies || "";

    const lien = colonne.querySelector(".project-link");
    // On n'affiche le bouton que pour les vrais liens web HTTPS.
    if (projet.lien && /^https:\/\//i.test(projet.lien)) {
      lien.href = projet.lien;
    } else {
      lien.remove();
    }
    zone.appendChild(colonne);
  });
}

// ------------------------------------------------------------
// 4. Chargement des données depuis Supabase
// ------------------------------------------------------------
async function chargerPortfolio() {
  const info = document.getElementById("info-donnees");
  const chargement = document.getElementById("chargement");
  const connexionConfiguree = SUPABASE_URL.startsWith("https://") &&
                              !SUPABASE_KEY.startsWith("COLLE_ICI");

  if (!connexionConfiguree || typeof supabase === "undefined") {
    projets = projetsDemo;
    info.textContent = "Mode démonstration : connecte Supabase pour afficher tes propres données.";
  } else {
    try {
      const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      const resultat = await client.from("projets").select("*").order("ordre", { ascending: true });

      if (resultat.error) throw resultat.error;

      projets = resultat.data;
      info.textContent = "Données chargées depuis Supabase. Les modifications apparaissent après actualisation de la page.";
    } catch (erreur) {
      console.error("Erreur Supabase :", erreur);
      projets = projetsDemo;
      info.textContent = "Connexion Supabase impossible. Vérifie l'URL, la clé publique et les règles RLS. Exemples affichés.";
    }
  }

  afficherProjets();
  chargement.classList.add("d-none");
}

// Actualiser le filtre lorsqu'on change de catégorie.
document.getElementById("filtre-projets").addEventListener("change", afficherProjets);

// Démarrer le chargement au lancement du site.
chargerPortfolio();
