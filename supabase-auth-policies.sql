-- Politiques RLS pour l'authentification
-- À exécuter dans l'éditeur SQL de Supabase

-- Désactiver RLS temporairement pour la configuration
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Allow insert appointments" ON appointments;
DROP POLICY IF EXISTS "Allow read appointments" ON appointments;
DROP POLICY IF EXISTS "Allow update appointments" ON appointments;

-- Politique pour l'insertion (création de RDV par les clients)
CREATE POLICY "Allow public insert appointments" ON appointments
    FOR INSERT WITH CHECK (true);

-- Politique pour la lecture (seulement pour les utilisateurs authentifiés)
CREATE POLICY "Allow authenticated read appointments" ON appointments
    FOR SELECT USING (auth.role() = 'authenticated');

-- Politique pour la mise à jour (seulement pour les utilisateurs authentifiés)
CREATE POLICY "Allow authenticated update appointments" ON appointments
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Réactiver RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
