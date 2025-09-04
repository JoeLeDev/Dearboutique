'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import BookingCalendar from '@/components/Calendar'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { CheckCircle, Star, Users, Clock } from 'lucide-react'

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleDateSelect = (date: string, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
  }

  const handleFormSubmit = async (data: { firstName: string; lastName: string; email: string; phone: string; service: string; platform: string; message: string; date: string; time: string }) => {
    try {
      
      // Appel de l'API pour envoyer l'email et sauvegarder en base
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi')
      }

      setIsSubmitted(true)
    } catch (error) {
      alert('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Rendez-vous confirmé !
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Merci pour votre réservation. Nous vous contacterons dans les plus brefs délais pour confirmer votre rendez-vous.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setSelectedDate('')
                setSelectedTime('')
              }}
              className="btn-primary"
            >
              Prendre un autre rendez-vous
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gold-50 to-amber-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prenez rendez-vous chez <span className="text-gold-600">Dear Boutique</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Découvrez nos bijoux uniques avec l&apos;aide de nos experts. 
              Essayage, conseil personnalisé et création sur mesure vous attendent.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-8 h-8 text-gold-600" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600">Clients satisfaits</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Star className="w-8 h-8 text-gold-600" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-gray-600">Note moyenne</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Clock className="w-8 h-8 text-gold-600" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">15min</div>
                  <div className="text-gray-600">Temps de réponse</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos services
              </h2>
              <p className="text-lg text-gray-600">
                Choisissez le service qui correspond à vos besoins
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Essayage',
                  description: 'Essayez nos bijoux dans un cadre intimiste',
                  icon: '💍'
                },
                {
                  title: 'Conseil',
                  description: 'Expertise personnalisée pour votre style',
                  icon: '✨'
                },
                {
                  title: 'Création',
                  description: 'Bijoux uniques créés spécialement pour vous',
                  icon: '🎨'
                },
                {
                  title: 'Réparation',
                  description: 'Remise en état de vos bijoux précieux',
                  icon: '🔧'
                }
              ].map((service, index) => (
                <div key={index} className="card text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Réservez votre créneau
              </h2>
              <p className="text-lg text-gray-600">
                Sélectionnez la date et l&apos;heure qui vous conviennent
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BookingCalendar
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
              <ContactForm
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}