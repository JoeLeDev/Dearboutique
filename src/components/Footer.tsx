'use client'

import Link from 'next/link'
import { Heart, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gold-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-gold-400" />
              <span className="text-2xl font-bold">Dear Boutique</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre bijouterie de confiance pour des bijoux uniques et personnalisés. 
              Découvrez notre collection exclusive et laissez-vous conseiller par nos experts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">
                  123 Rue de la Bijouterie<br />
                  75001 Paris, France
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">contact@dearboutique.com</span>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Lun - Ven</span>
                <span>9h - 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span>9h - 17h</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span>Fermé</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Dear Boutique. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                Mentions légales
              </Link>
              <Link href="/cgv" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                CGV
              </Link>
              <Link href="/confidentialite" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
