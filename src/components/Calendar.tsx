'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Calendar, Clock, MapPin } from 'lucide-react'

interface CalendarProps {
  onDateSelect: (date: string, time: string) => void
  selectedDate?: string
  selectedTime?: string
}

export default function BookingCalendar({ onDateSelect, selectedDate, selectedTime }: CalendarProps) {
  const [currentView, setCurrentView] = useState('dayGridMonth')

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const handleDateClick = (info: { dateStr: string }) => {
    const date = info.dateStr
    onDateSelect(date, '')
    setCurrentView('timeGridDay')
  }

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onDateSelect(selectedDate, time)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-6 w-full justify-center">
        <Calendar className="w-6 h-6 text-gold-600" />
        <h2 className="text-xl font-semibold text-gray-900">Choisissez votre créneau</h2>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridDay'
          }}
          dateClick={handleDateClick}
          selectable={true}
          selectMirror={true}
          height="auto"
          weekends={true}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5, 6],
            startTime: '09:00',
            endTime: '18:00',
          }}
          slotMinTime="09:00"
          slotMaxTime="18:00"
          slotDuration="00:30:00"
          allDaySlot={false}
          locale="fr"
          buttonText={{
            today: 'Aujourd\'hui',
            month: 'Mois',
            day: 'Jour'
          }}
        />
      </div>

      {/* Selected date and time slots */}
      {selectedDate && (
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4 w-full justify-center">
            <Clock className="w-5 h-5 text-gold-600" />
            <h3 className="text-lg font-medium text-gray-900">
              Créneaux disponibles le {new Date(selectedDate).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? 'bg-gold-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gold-100 hover:text-gold-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {selectedTime && (
            <div className="mt-4 p-4 bg-gold-50 rounded-lg">
              <div className="flex items-center space-x-2 text-gold-700">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Rendez-vous confirmé le {new Date(selectedDate).toLocaleDateString('fr-FR')} à {selectedTime}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
