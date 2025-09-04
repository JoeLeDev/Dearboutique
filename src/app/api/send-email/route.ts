import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

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

    // Initialisation de Resend
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    // Vérification de la clé API
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY manquante dans les variables d\'environnement')
      return NextResponse.json(
        { error: 'Configuration email manquante' },
        { status: 500 }
      )
    }

    // Envoi de l'email de réservation
    const emailData = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@dearboutique.com',
      to: [process.env.RESERVATION_EMAIL || 'contact@dearboutique.com'],
      subject: `Nouvelle réservation - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #d4af37; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">💎 Nouvelle Réservation - Dear Boutique</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #d4af37; margin-top: 0;">Informations du client</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Nom complet :</td>
                <td style="padding: 8px 0; color: #666;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email :</td>
                <td style="padding: 8px 0; color: #666;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Téléphone :</td>
                <td style="padding: 8px 0; color: #666;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Service :</td>
                <td style="padding: 8px 0; color: #666;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Plateforme :</td>
                <td style="padding: 8px 0; color: #666;">${platform}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Date :</td>
                <td style="padding: 8px 0; color: #666;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Heure :</td>
                <td style="padding: 8px 0; color: #666;">${time}</td>
              </tr>
            </table>
            
            <h3 style="color: #d4af37; margin-top: 25px;">Message du client</h3>
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #d4af37;">
              <p style="margin: 0; color: #333; line-height: 1.5;">${message}</p>
            </div>
            
            <div style="margin-top: 25px; padding: 15px; background-color: #fff3cd; border-radius: 5px; border-left: 4px solid #d4af37;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>📅 Rendez-vous programmé le :</strong> ${date} à ${time}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>Email envoyé automatiquement depuis le système de réservation Dear Boutique</p>
          </div>
        </div>
      `,
    })

    console.log('Email envoyé avec succès:', emailData)

    // Sauvegarde en base de données
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          service: service,
          platform: platform,
          message: message,
          appointment_date: date,
          appointment_time: time,
          status: 'pending'
        }
      ])
      .select()

    if (dbError) {
      console.error('Erreur lors de la sauvegarde en base:', dbError)
      // On continue même si la sauvegarde échoue, l'email a été envoyé
    } else {
      console.log('Rendez-vous sauvegardé en base:', appointment)
    }

    // Réponse de succès
    return NextResponse.json(
      { 
        message: 'Réservation enregistrée avec succès',
        reservationId: appointment?.[0]?.id || `RDV-${Date.now()}`,
        appointmentId: appointment?.[0]?.id
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
