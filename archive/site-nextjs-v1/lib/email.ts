import nodemailer from 'nodemailer'

// Email configuration
const createTransporter = () => {
  // For development, we'll use a simple SMTP configuration
  // In production, you would use a service like SendGrid, AWS SES, etc.
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com', // You can change this to your email provider
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  })
}

export const sendApprovalEmail = async (
  userEmail: string,
  userName: string,
  organizationName: string,
  donationDetails: {
    foodCategory: string
    description: string
    quantity: number
    expiryDate: string
  }
) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@givinghand.com',
      to: userEmail,
      subject: '✅ Your Food Donation Has Been Approved - GivingHand',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Donation Approved</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #45A761, #3a8f52); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .success-badge { background: #45A761; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; margin-bottom: 20px; }
            .donation-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #45A761; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .button { background: #45A761; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Donation Approved!</h1>
              <p>Your food donation has been successfully approved and is now published</p>
            </div>
            
            <div class="content">
              <div class="success-badge">✅ APPROVED</div>
              
              <h2>Dear ${userName},</h2>
              
              <p>Great news! Your food donation submission from <strong>${organizationName}</strong> has been reviewed and <strong>approved</strong> by our admin team.</p>
              
              <div class="donation-details">
                <h3>📋 Donation Details:</h3>
                <ul>
                  <li><strong>Food Category:</strong> ${donationDetails.foodCategory}</li>
                  <li><strong>Description:</strong> ${donationDetails.description}</li>
                  <li><strong>Quantity:</strong> ${donationDetails.quantity}</li>
                  <li><strong>Expiry Date:</strong> ${donationDetails.expiryDate}</li>
                </ul>
              </div>
              
              <h3>🚀 What happens next?</h3>
              <ul>
                <li>✅ Your donation is now <strong>published</strong> on our platform</li>
                <li>🏠 Local charities and shelters can now see your donation</li>
                <li>📞 You may receive contact from organizations interested in your donation</li>
                <li>🤝 Help coordinate pickup or delivery as needed</li>
              </ul>
              
              <p>Thank you for being part of the GivingHand community and helping reduce food waste while feeding those in need!</p>
              
              <a href="http://localhost:3001/donate-food" class="button">Submit Another Donation</a>
              
              <div class="footer">
                <p>Best regards,<br>
                <strong>The GivingHand Team</strong></p>
                
                <p style="margin-top: 30px; font-size: 12px; color: #999;">
                  This is an automated message from GivingHand. Please do not reply to this email.
                  <br>If you have any questions, please contact us through our platform.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Approval email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }

  } catch (error) {
    console.error('Error sending approval email:', error)
    return { success: false, error: error.message }
  }
}

export const sendRejectionEmail = async (
  userEmail: string,
  userName: string,
  organizationName: string,
  rejectionReason: string,
  donationDetails: {
    foodCategory: string
    description: string
  }
) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@givinghand.com',
      to: userEmail,
      subject: '📋 Update on Your Food Donation Submission - GivingHand',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Donation Update</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .warning-badge { background: #f59e0b; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; margin-bottom: 20px; }
            .reason-box { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .button { background: #45A761; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 Donation Update</h1>
              <p>Update on your food donation submission</p>
            </div>
            
            <div class="content">
              <div class="warning-badge">⚠️ NEEDS REVISION</div>
              
              <h2>Dear ${userName},</h2>
              
              <p>Thank you for your food donation submission from <strong>${organizationName}</strong>. After review, we need some adjustments before we can approve your donation.</p>
              
              <div class="reason-box">
                <h3>📝 Feedback from our team:</h3>
                <p><strong>${rejectionReason}</strong></p>
              </div>
              
              <h3>🔄 Next Steps:</h3>
              <ul>
                <li>📋 Please review the feedback above</li>
                <li>✏️ Make the necessary adjustments</li>
                <li>🔄 Submit a new donation with the corrections</li>
                <li>✅ We'll review it again promptly</li>
              </ul>
              
              <p>We appreciate your commitment to reducing food waste and helping our community. Please don't hesitate to submit again with the requested changes!</p>
              
              <a href="http://localhost:3001/donate-food" class="button">Submit New Donation</a>
              
              <div class="footer">
                <p>Best regards,<br>
                <strong>The GivingHand Team</strong></p>
                
                <p style="margin-top: 30px; font-size: 12px; color: #999;">
                  This is an automated message from GivingHand. Please do not reply to this email.
                  <br>If you have any questions, please contact us through our platform.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Rejection email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }

  } catch (error) {
    console.error('Error sending rejection email:', error)
    return { success: false, error: error.message }
  }
}
