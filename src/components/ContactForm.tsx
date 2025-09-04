'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { User, Mail, Phone, MessageSquare, Send, Video, Briefcase } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  platform: string
  message: string
}

const schema = yup.object({
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  phone: yup.string().required('Le téléphone est requis'),
  service: yup.string().required('Veuillez sélectionner un service'),
  platform: yup.string().required('Veuillez sélectionner une plateforme'),
  message: yup.string().required('Veuillez décrire votre demande')
})

interface ContactFormProps {
  selectedDate?: string
  selectedTime?: string
  onSubmit: (data: FormData & { date: string; time: string }) => void
}

export default function ContactForm({ selectedDate, selectedTime, onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const services = [
    'Essayage de bijoux',
    'Conseil personnalisé',
    'Création sur mesure',
    'Réparation',
    'Nettoyage',
    'Autre'
  ]

  const platforms = [
    'Zoom',
    'Google Meet',
  ]

  const onFormSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedTime) {
      alert('Veuillez d&apos;abord sélectionner une date et un créneau horaire')
      return
    }

    setIsSubmitting(true)
    
    try {
      await onSubmit({
        ...data,
        date: selectedDate,
        time: selectedTime
      })
      reset()
    } catch {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-6 h-6 text-gold-600" />
        <h2 className="text-xl font-semibold text-gray-900">Vos informations</h2>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Nom et Prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Prénom *
            </label>
            <input
              {...register('firstName')}
              className="input-field"
              placeholder="Votre prénom"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Nom *
            </label>
            <input
              {...register('lastName')}
              className="input-field"
              placeholder="Votre nom"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email et Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              className="input-field"
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Téléphone *
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="input-field"
              placeholder="01 23 45 67 89"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="w-4 h-4 inline mr-2" />
            Service souhaité *
          </label>
          <select {...register('service')} className="input-field">
            <option value="">Sélectionnez un service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
          )}
        </div>

        {/* Plateforme de visioconférence */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Video className="w-4 h-4 inline mr-2" />
            Plateforme de visioconférence préférée *
          </label>
          <select {...register('platform')} className="input-field">
            <option value="">Sélectionnez une plateforme</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          {errors.platform && (
            <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message *
          </label>
          <textarea
            {...register('message')}
            rows={4}
            className="input-field"
            placeholder="Décrivez votre demande, vos préférences ou toute information utile..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedDate || !selectedTime || isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>
            {isSubmitting ? 'Envoi en cours...' : 'Confirmer le rendez-vous'}
          </span>
        </button>

        {(!selectedDate || !selectedTime) && (
          <p className="text-amber-600 text-sm text-center">
            Veuillez d&apos;abord sélectionner une date et un créneau horaire
          </p>
        )}
      </form>
    </div>
  )
}
