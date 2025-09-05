'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, Appointment } from '@/lib/supabase'
import { Calendar, Clock, Mail, Phone, MessageSquare, CheckCircle, XCircle, AlertCircle, LogOut } from 'lucide-react'
import LoginForm from '@/components/LoginForm'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setIsAuthenticated(!!session)
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
  }

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true })

      if (error) throw error

      let filteredData = data
      if (filter !== 'all') {
        filteredData = data.filter(apt => apt.status === filter)
      }

      setAppointments(filteredData || [])
    } catch {
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const updateAppointmentStatus = async (id: number, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)

      if (error) throw error

      // Mettre à jour l'état local
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === id ? { ...apt, status } : apt
        )
      )
    } catch {
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  // Affichage du formulaire de connexion si non authentifié
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  // Chargement initial
  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              💎 Administration - Dear Boutique
            </h1>
            <p className="text-gray-600">
              Gestion des rendez-vous clients
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Filtres */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {([
              { key: 'all' as const, label: 'Tous', count: appointments.length },
              { key: 'pending' as const, label: 'En attente', count: appointments.filter(a => a.status === 'pending').length },
              { key: 'confirmed' as const, label: 'Confirmés', count: appointments.filter(a => a.status === 'confirmed').length },
              { key: 'cancelled' as const, label: 'Annulés', count: appointments.filter(a => a.status === 'cancelled').length }
            ] as const).map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as 'all' | 'pending' | 'confirmed' | 'cancelled')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === key
                    ? 'bg-gold-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Liste des rendez-vous */}
        <div className="grid gap-6">
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun rendez-vous trouvé
              </h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'Aucun rendez-vous n\'a encore été pris.'
                  : `Aucun rendez-vous avec le statut "${filter}".`
                }
              </p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(appointment.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.first_name} {appointment.last_name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.appointment_date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.appointment_time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'pending' && 'En attente'}
                    {appointment.status === 'confirmed' && 'Confirmé'}
                    {appointment.status === 'cancelled' && 'Annulé'}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{appointment.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{appointment.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-sm mb-2">
                    <span className="font-medium text-gray-700">Service :</span>
                    <span className="text-gray-600">{appointment.service}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium text-gray-700">Plateforme :</span>
                    <span className="text-gray-600">{appointment.platform}</span>
                  </div>
                </div>

                {appointment.message && (
                  <div className="mb-4">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Message :</span>
                        <p className="text-sm text-gray-600 mt-1">{appointment.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {appointment.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id!, 'confirmed')}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirmer</span>
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id!, 'cancelled')}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Annuler</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
