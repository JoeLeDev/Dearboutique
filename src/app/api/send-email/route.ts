import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, service, platform, message, date, time } = body

    // Validation des données
    if (!firstName || !lastName || !email || !phone || !service || !platform || !message || !date || !time) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Ici, vous pouvez intégrer avec un service d'email comme:
    // - Nodemailer avec SMTP
    // - SendGrid
    // - Resend
    // - EmailJS (côté client)
    
    // Pour l'instant, on simule l'envoi
    console.log('Nouvelle réservation reçue:', {
      firstName,
      lastName,
      email,
      phone,
      service,
      platform,
      message,
      date,
      time,
      timestamp: new Date().toISOString()
    })

    // Simulation d'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Réponse de succès
    return NextResponse.json(
      { 
        message: 'Réservation enregistrée avec succès',
        reservationId: `RDV-${Date.now()}`
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
