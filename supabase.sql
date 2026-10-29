-- ============================================================
-- BASE DE DONNÉES : PORTFOLIO ENNYO BORI
-- À coller dans Supabase > SQL Editor > New query > Run
-- ============================================================

-- 1. Table des projets
create table if not exists public.projets (
  id bigint generated always as identity primary key,
  titre text not null,
  description text not null,
  categorie text not null default 'Web',
  technologies text default '',
  lien text default '',
  ordre integer not null default 0
);

-- 2. Table des expériences
create table if not exists public.experiences (
  id bigint generated always as identity primary key,
  titre text not null,
  organisation text not null,
  periode text not null,
  description text not null,
  ordre integer not null default 0
);

-- 3. Sécurité : lecture publique uniquement
-- Les visiteurs peuvent LIRE, mais pas AJOUTER / MODIFIER / SUPPRIMER.
alter table public.projets enable row level security;
alter table public.experiences enable row level security;

revoke all on table public.projets from anon, authenticated;
revoke all on table public.experiences from anon, authenticated;
grant select on table public.projets to anon;
grant select on table public.experiences to anon;

-- Policies de lecture (on les recrée pour permettre de relancer le script).
drop policy if exists "Lecture publique des projets" on public.projets;
create policy "Lecture publique des projets"
  on public.projets for select to anon using (true);

drop policy if exists "Lecture publique des experiences" on public.experiences;
create policy "Lecture publique des experiences"
  on public.experiences for select to anon using (true);

-- 4. Exemples : à personnaliser ensuite dans le Table Editor.
-- Les données ne sont ajoutées que si la table est vide.
insert into public.projets (titre, description, categorie, technologies, lien, ordre)
select titre, description, categorie, technologies, lien, ordre
from (values
  ('Mon portfolio dynamique',
   'Un CV en ligne réalisé avec HTML, CSS, JavaScript, GitHub Pages et Supabase.',
   'Web', 'HTML · CSS · Bootstrap · JavaScript', '', 1),
  ('Première page responsive',
   'Exercice d''apprentissage : construire une page adaptée à différents écrans.',
   'École', 'HTML · CSS · Bootstrap', '', 2)
) as exemples(titre, description, categorie, technologies, lien, ordre)
where not exists (select 1 from public.projets);

insert into public.experiences (titre, organisation, periode, description, ordre)
select titre, organisation, periode, description, ordre
from (values
  ('B1 Informatique', 'Formation en informatique', '2026',
   'Découverte du développement web, de Git et des bases de données.', 1),
  ('Atelier CV & Portfolio', 'Projet pédagogique', 'Octobre 2026',
   'Création d''un site personnel responsive et d''un affichage dynamique.', 2)
) as exemples(titre, organisation, periode, description, ordre)
where not exists (select 1 from public.experiences);
