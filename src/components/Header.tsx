'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-gold-800 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center text-sm text-white">
            <div className="flex items-center space-x-4">
            </div>
            <div className="hidden md:block">
              <span>Livraison gratuite dès 70&euro; d'achat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-gold-600" />
            <span className="text-2xl font-bold text-gray-900">Dear Boutique</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gold-600 transition-colors">
              Accueil
            </Link>
            <Link href="/bijoux" className="text-gray-700 hover:text-gold-600 transition-colors">
              Bijoux
            </Link>
            <Link href="/bagues" className="text-gray-700 hover:text-gold-600 transition-colors">
              Bagues
            </Link>
            <Link href="/colliers" className="text-gray-700 hover:text-gold-600 transition-colors">
              Colliers
            </Link>
            <Link href="/boucles" className="text-gray-700 hover:text-gold-600 transition-colors">
              Boucles d&apos;oreilles
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="btn-secondary">
              Retour au site
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
