-- Correction des politiques RLS pour l'admin
-- À exécuter dans l'éditeur SQL de Supabase

-- Désactiver RLS temporairement
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Allow public insert appointments" ON appointments;
DROP POLICY IF EXISTS "Allow authenticated read appointments" ON appointments;
DROP POLICY IF EXISTS "Allow authenticated update appointments" ON appointments;

-- Politique pour l'insertion (création de RDV par les clients)
CREATE POLICY "Allow public insert appointments" ON appointments
    FOR INSERT WITH CHECK (true);

-- Politique pour la lecture (utilisateurs authentifiés peuvent tout voir)
CREATE POLICY "Allow authenticated read all appointments" ON appointments
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- Politique pour la mise à jour (utilisateurs authentifiés peuvent modifier)
CREATE POLICY "Allow authenticated update all appointments" ON appointments
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Réactiver RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
