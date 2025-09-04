-- Schéma de base de données pour Dear Boutique RDV
-- À exécuter dans l'éditeur SQL de Supabase

-- Table des rendez-vous
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(100) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  message TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_email ON appointments(email);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_appointments_updated_at 
    BEFORE UPDATE ON appointments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Optionnel pour la sécurité
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion (création de RDV)
CREATE POLICY "Allow insert appointments" ON appointments
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture (pour l'admin)
CREATE POLICY "Allow read appointments" ON appointments
    FOR SELECT USING (true);

-- Politique pour permettre la mise à jour (changement de statut)
CREATE POLICY "Allow update appointments" ON appointments
    FOR UPDATE USING (true);
