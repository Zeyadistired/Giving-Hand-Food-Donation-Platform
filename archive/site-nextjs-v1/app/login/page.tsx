"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  CheckCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Building2,
  ArrowRight,
  Users,
  Globe,
  X
} from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotStep, setForgotStep] = useState<'email' | 'sent'>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [websiteStats, setWebsiteStats] = useState<any>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      console.log('Initiating Google OAuth flow...')

      // Create realistic Google OAuth URL
      const googleOAuthUrl = 'https://accounts.google.com/o/oauth2/auth?' + new URLSearchParams({
        client_id: '123456789-abcdefghijklmnop.apps.googleusercontent.com',
        redirect_uri: window.location.origin + '/auth/google/callback',
        response_type: 'code',
        scope: 'email profile openid',
        state: 'random_state_string',
        access_type: 'offline'
      }).toString()

      // Open popup with realistic Google OAuth URL
      const googlePopup = window.open(
        'about:blank',
        'googleLogin',
        'width=500,height=650,scrollbars=yes,resizable=yes,left=' +
        (window.screen.width / 2 - 250) + ',top=' + (window.screen.height / 2 - 325)
      )

      if (googlePopup) {
        // Simulate realistic Google account selection page
        googlePopup.document.write(`
          <html>
            <head>
              <title>Sign in - Google Accounts</title>
              <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: 'Roboto', Arial, sans-serif; margin: 0; padding: 0; background: #fff;">
              <div style="padding: 48px 40px 36px 40px; text-align: center;">
                <div style="margin-bottom: 24px;">
                  <svg width="75" height="24" viewBox="0 0 75 24" style="display: inline-block;">
                    <path fill="#4285F4" d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98.44 9.24.44c-5.48 0-9.94 4.04-9.94 9.56s4.46 9.56 9.94 9.56c2.83 0 4.96-.93 6.62-2.68 1.7-1.7 2.24-4.1 2.24-6.04 0-.6-.05-1.18-.15-1.65H9.24z"/>
                    <path fill="#EA4335" d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.47 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"/>
                    <path fill="#4285F4" d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1z"/>
                    <path fill="#34A853" d="M58 .24h2.51v17.57H58z"/>
                    <path fill="#EA4335" d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66C72.6 8.2 71.05 6.19 68.4 6.19c-3.13 0-5.69 2.44-5.69 5.81 0 3.26 2.53 5.81 5.98 5.81 2.76 0 4.36-1.7 5.02-2.68l-2.06-1.37c-.7 1.02-1.64 1.76-2.96 1.76z"/>
                  </svg>
                </div>

                <h1 style="font-size: 24px; font-weight: 400; margin: 0 0 8px 0; color: #202124;">Choose an account</h1>
                <p style="font-size: 14px; color: #5f6368; margin: 0 0 32px 0;">to continue to GivingHand</p>

                <div style="border: 1px solid #dadce0; border-radius: 8px; margin-bottom: 16px; cursor: pointer; transition: box-shadow 0.2s;"
                     onclick="selectAccount('Eui@admin.com')"
                     onmouseover="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.12)'"
                     onmouseout="this.style.boxShadow='none'">
                  <div style="padding: 12px 16px; display: flex; align-items: center;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #1a73e8; display: flex; align-items: center; justify-content: center; margin-right: 16px; color: white; font-weight: 500;">
                      E
                    </div>
                    <div style="flex: 1; text-align: left;">
                      <div style="font-size: 14px; color: #202124; font-weight: 500;">Eui Admin</div>
                      <div style="font-size: 14px; color: #5f6368;">Eui@admin.com</div>
                    </div>
                  </div>
                </div>

                <div style="border: 1px solid #dadce0; border-radius: 8px; margin-bottom: 16px; cursor: pointer; transition: box-shadow 0.2s;"
                     onclick="selectAccount('user@example.com')"
                     onmouseover="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.12)'"
                     onmouseout="this.style.boxShadow='none'">
                  <div style="padding: 12px 16px; display: flex; align-items: center;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #34a853; display: flex; align-items: center; justify-content: center; margin-right: 16px; color: white; font-weight: 500;">
                      U
                    </div>
                    <div style="flex: 1; text-align: left;">
                      <div style="font-size: 14px; color: #202124; font-weight: 500;">Regular User</div>
                      <div style="font-size: 14px; color: #5f6368;">user@example.com</div>
                    </div>
                  </div>
                </div>

                <div style="border: 1px solid #dadce0; border-radius: 8px; margin-bottom: 32px; cursor: pointer; transition: box-shadow 0.2s;"
                     onclick="useAnotherAccount()"
                     onmouseover="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.12)'"
                     onmouseout="this.style.boxShadow='none'">
                  <div style="padding: 12px 16px; display: flex; align-items: center;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #5f6368; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#5f6368">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </div>
                    <div style="flex: 1; text-align: left;">
                      <div style="font-size: 14px; color: #202124; font-weight: 500;">Use another account</div>
                    </div>
                  </div>
                </div>

                <div style="font-size: 12px; color: #5f6368; line-height: 16px;">
                  To continue, Google will share your name, email address, and profile picture with GivingHand.
                </div>
              </div>

              <script>
                function selectAccount(email) {
                  if (email === 'Eui@admin.com') {
                    showConsentScreen(email);
                  } else {
                    alert('Access denied. Only admin account can access the dashboard.');
                  }
                }

                function useAnotherAccount() {
                  alert('Please use the admin account (Eui@admin.com) to access the dashboard.');
                }

                function showConsentScreen(email) {
                  document.body.innerHTML = \`
                    <div style="padding: 48px 40px 36px 40px; text-align: center; font-family: 'Roboto', Arial, sans-serif;">
                      <div style="margin-bottom: 24px;">
                        <svg width="75" height="24" viewBox="0 0 75 24" style="display: inline-block;">
                          <path fill="#4285F4" d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98.44 9.24.44c-5.48 0-9.94 4.04-9.94 9.56s4.46 9.56 9.94 9.56c2.83 0 4.96-.93 6.62-2.68 1.7-1.7 2.24-4.1 2.24-6.04 0-.6-.05-1.18-.15-1.65H9.24z"/>
                          <path fill="#EA4335" d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.47 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"/>
                          <path fill="#4285F4" d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1z"/>
                          <path fill="#34A853" d="M58 .24h2.51v17.57H58z"/>
                          <path fill="#EA4335" d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66C72.6 8.2 71.05 6.19 68.4 6.19c-3.13 0-5.69 2.44-5.69 5.81 0 3.26 2.53 5.81 5.98 5.81 2.76 0 4.36-1.7 5.02-2.68l-2.06-1.37c-.7 1.02-1.64 1.76-2.96 1.76z"/>
                        </svg>
                      </div>

                      <div style="margin-bottom: 24px;">
                        <div style="width: 48px; height: 48px; border-radius: 50%; background: #1a73e8; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: white; font-weight: 500; font-size: 20px;">
                          E
                        </div>
                        <div style="font-size: 16px; color: #202124; margin-bottom: 4px;">Eui Admin</div>
                        <div style="font-size: 14px; color: #5f6368;">\${email}</div>
                      </div>

                      <h1 style="font-size: 24px; font-weight: 400; margin: 0 0 8px 0; color: #202124;">GivingHand wants to access your Google Account</h1>
                      <p style="font-size: 14px; color: #5f6368; margin: 0 0 24px 0;">This will allow GivingHand to:</p>

                      <div style="text-align: left; margin: 0 0 32px 0; padding: 0 24px;">
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                          <div style="width: 20px; height: 20px; margin-right: 16px;">
                            <svg viewBox="0 0 24 24" fill="#5f6368">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <span style="font-size: 14px; color: #202124;">See your email address</span>
                        </div>
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                          <div style="width: 20px; height: 20px; margin-right: 16px;">
                            <svg viewBox="0 0 24 24" fill="#5f6368">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <span style="font-size: 14px; color: #202124;">See your personal info, including any personal info you've made publicly available</span>
                        </div>
                      </div>

                      <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button onclick="window.close()" style="padding: 8px 24px; border: 1px solid #dadce0; background: #fff; color: #3c4043; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer;">
                          Cancel
                        </button>
                        <button onclick="approveAccess()" style="padding: 8px 24px; background: #1a73e8; color: white; border: none; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer;">
                          Allow
                        </button>
                      </div>
                    </div>
                  \`;
                }

                function approveAccess() {
                  window.opener.postMessage({
                    type: 'GOOGLE_LOGIN_SUCCESS',
                    email: 'Eui@admin.com',
                    provider: 'google'
                  }, '*');
                  window.close();
                }
              </script>
            </body>
          </html>
        `)
      }

      // Listen for popup messages
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
          window.removeEventListener('message', messageHandler)

          setTimeout(() => {
            alert('Google login successful! Redirecting to admin dashboard...')
            sessionStorage.setItem('adminLoggedIn', 'true')
            window.location.href = '/admin'
          }, 1000)
        }
      }

      window.addEventListener('message', messageHandler)

      // Handle popup closed without completion
      const checkClosed = setInterval(() => {
        if (googlePopup?.closed) {
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
          setIsLoading(false)
        }
      }, 1000)

    } catch (error) {
      console.error('Google login error:', error)
      alert('Google login failed. Please try again.')
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
    setIsLoading(true)
    try {
      console.log('Initiating Facebook OAuth flow...')

      // Create realistic Facebook OAuth URL
      const facebookOAuthUrl = 'https://www.facebook.com/v18.0/dialog/oauth?' + new URLSearchParams({
        client_id: '1234567890123456',
        redirect_uri: window.location.origin + '/auth/facebook/callback',
        response_type: 'code',
        scope: 'email,public_profile',
        state: 'random_state_string'
      }).toString()

      // Open popup with realistic Facebook OAuth URL
      const facebookPopup = window.open(
        'about:blank',
        'facebookLogin',
        'width=500,height=650,scrollbars=yes,resizable=yes,left=' +
        (window.screen.width / 2 - 250) + ',top=' + (window.screen.height / 2 - 325)
      )

      if (facebookPopup) {
        // Simulate realistic Facebook login page
        facebookPopup.document.write(`
          <html>
            <head>
              <title>Facebook</title>
              <link href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 0; background: #f0f2f5;">
              <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1); padding: 20px; width: 100%; max-width: 396px;">
                  <div style="text-align: center; margin-bottom: 20px;">
                    <svg width="40" height="40" viewBox="0 0 40 40" style="margin-bottom: 16px;">
                      <defs>
                        <linearGradient id="a" x1="50%" x2="50%" y1="97.078%" y2="0%">
                          <stop offset="0%" stop-color="#0062E0"/>
                          <stop offset="100%" stop-color="#19AFFF"/>
                        </linearGradient>
                      </defs>
                      <circle cx="20" cy="20" r="20" fill="url(#a)"/>
                      <path d="M25.312 20.781l.7-4.562h-4.375v-2.969c0-1.25.625-2.469 2.594-2.469h2v-3.875s-1.813-.312-3.531-.312c-3.625 0-5.969 2.188-5.969 6.156v3.5h-4v4.562h4v11.031c.813.125 1.625.125 2.438 0V20.781h3.143z" fill="#FFF"/>
                    </svg>
                    <h2 style="color: #1c1e21; font-size: 32px; font-weight: 500; margin: 0; line-height: 38px;">facebook</h2>
                  </div>

                  <div style="margin-bottom: 20px;">
                    <p style="color: #1c1e21; font-size: 17px; margin: 0 0 20px 0; text-align: center;">
                      Choose an account to continue to GivingHand
                    </p>

                    <div style="border: 1px solid #dddfe2; border-radius: 8px; margin-bottom: 12px; cursor: pointer; transition: background-color 0.2s;"
                         onclick="selectFacebookAccount('Eui@admin.com')"
                         onmouseover="this.style.backgroundColor='#f7f8fa'"
                         onmouseout="this.style.backgroundColor='white'">
                      <div style="padding: 12px; display: flex; align-items: center;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; margin-right: 12px; color: white; font-weight: 600; font-size: 16px;">
                          E
                        </div>
                        <div style="flex: 1;">
                          <div style="font-size: 15px; color: #1c1e21; font-weight: 500;">Eui Admin</div>
                          <div style="font-size: 13px; color: #65676b;">Eui@admin.com</div>
                        </div>
                      </div>
                    </div>

                    <div style="border: 1px solid #dddfe2; border-radius: 8px; margin-bottom: 12px; cursor: pointer; transition: background-color 0.2s;"
                         onclick="selectFacebookAccount('user@example.com')"
                         onmouseover="this.style.backgroundColor='#f7f8fa'"
                         onmouseout="this.style.backgroundColor='white'">
                      <div style="padding: 12px; display: flex; align-items: center;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; margin-right: 12px; color: white; font-weight: 600; font-size: 16px;">
                          U
                        </div>
                        <div style="flex: 1;">
                          <div style="font-size: 15px; color: #1c1e21; font-weight: 500;">Regular User</div>
                          <div style="font-size: 13px; color: #65676b;">user@example.com</div>
                        </div>
                      </div>
                    </div>

                    <div style="border: 1px solid #dddfe2; border-radius: 8px; cursor: pointer; transition: background-color 0.2s;"
                         onclick="useAnotherFacebookAccount()"
                         onmouseover="this.style.backgroundColor='#f7f8fa'"
                         onmouseout="this.style.backgroundColor='white'">
                      <div style="padding: 12px; display: flex; align-items: center;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #42b883; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#42b883">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                          </svg>
                        </div>
                        <div style="flex: 1;">
                          <div style="font-size: 15px; color: #1c1e21; font-weight: 500;">Use another account</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style="text-align: center; font-size: 11px; color: #8a8d91; line-height: 14px;">
                    By continuing, you agree that GivingHand can access your public profile and email address.
                  </div>
                </div>
              </div>

              <script>
                function selectFacebookAccount(email) {
                  if (email === 'Eui@admin.com') {
                    showFacebookConsentScreen(email);
                  } else {
                    alert('Access denied. Only admin account can access the dashboard.');
                  }
                }

                function useAnotherFacebookAccount() {
                  alert('Please use the admin account (Eui@admin.com) to access the dashboard.');
                }

                function showFacebookConsentScreen(email) {
                  document.body.innerHTML = \`
                    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: #f0f2f5; font-family: Helvetica, Arial, sans-serif;">
                      <div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1); padding: 24px; width: 100%; max-width: 500px;">
                        <div style="text-align: center; margin-bottom: 24px;">
                          <svg width="40" height="40" viewBox="0 0 40 40" style="margin-bottom: 16px;">
                            <defs>
                              <linearGradient id="a" x1="50%" x2="50%" y1="97.078%" y2="0%">
                                <stop offset="0%" stop-color="#0062E0"/>
                                <stop offset="100%" stop-color="#19AFFF"/>
                              </linearGradient>
                            </defs>
                            <circle cx="20" cy="20" r="20" fill="url(#a)"/>
                            <path d="M25.312 20.781l.7-4.562h-4.375v-2.969c0-1.25.625-2.469 2.594-2.469h2v-3.875s-1.813-.312-3.531-.312c-3.625 0-5.969 2.188-5.969 6.156v3.5h-4v4.562h4v11.031c.813.125 1.625.125 2.438 0V20.781h3.143z" fill="#FFF"/>
                          </svg>

                          <div style="margin-bottom: 16px;">
                            <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; color: white; font-weight: 600; font-size: 24px;">
                              E
                            </div>
                            <div style="font-size: 17px; color: #1c1e21; font-weight: 500;">Eui Admin</div>
                            <div style="font-size: 15px; color: #65676b;">\${email}</div>
                          </div>
                        </div>

                        <h1 style="font-size: 20px; font-weight: 500; margin: 0 0 16px 0; color: #1c1e21; text-align: center;">
                          GivingHand wants to access your public profile and email address
                        </h1>

                        <div style="background: #f7f8fa; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                          <div style="font-size: 15px; color: #1c1e21; font-weight: 500; margin-bottom: 12px;">This will allow GivingHand to:</div>
                          <div style="space-y: 8px;">
                            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                              <div style="width: 16px; height: 16px; margin-right: 12px;">
                                <svg viewBox="0 0 16 16" fill="#42b883">
                                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                              </div>
                              <span style="font-size: 14px; color: #1c1e21;">Access your public profile</span>
                            </div>
                            <div style="display: flex; align-items: center;">
                              <div style="width: 16px; height: 16px; margin-right: 12px;">
                                <svg viewBox="0 0 16 16" fill="#42b883">
                                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                              </div>
                              <span style="font-size: 14px; color: #1c1e21;">Access your email address</span>
                            </div>
                          </div>
                        </div>

                        <div style="display: flex; gap: 12px;">
                          <button onclick="window.close()" style="flex: 1; padding: 12px 24px; border: 1px solid #ccd0d5; background: #f5f6f7; color: #4b4f56; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer;">
                            Cancel
                          </button>
                          <button onclick="approveFacebookAccess()" style="flex: 1; padding: 12px 24px; background: #1877f2; color: white; border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer;">
                            Continue as Eui
                          </button>
                        </div>
                      </div>
                    </div>
                  \`;
                }

                function approveFacebookAccess() {
                  window.opener.postMessage({
                    type: 'FACEBOOK_LOGIN_SUCCESS',
                    email: 'Eui@admin.com',
                    provider: 'facebook'
                  }, '*');
                  window.close();
                }
              </script>
            </body>
          </html>
        `)
      }

      // Listen for popup messages
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'FACEBOOK_LOGIN_SUCCESS') {
          window.removeEventListener('message', messageHandler)

          // Simulate token verification
          setTimeout(() => {
            alert('Facebook login successful! Redirecting to admin dashboard...')
            sessionStorage.setItem('adminLoggedIn', 'true')
            window.location.href = '/admin'
          }, 1000)
        }
      }

      window.addEventListener('message', messageHandler)

      // Handle popup closed without completion
      const checkClosed = setInterval(() => {
        if (facebookPopup?.closed) {
          clearInterval(checkClosed)
          window.removeEventListener('message', messageHandler)
          setIsLoading(false)
        }
      }, 1000)

    } catch (error) {
      console.error('Facebook login error:', error)
      alert('Facebook login failed. Please try again.')
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        alert('Please fill in all fields')
        setIsLoading(false)
        return
      }

      // Check if this is admin login
      const ADMIN_EMAIL = 'Eui@admin.com'
      const ADMIN_PASSWORD = 'Eui1234'

      console.log('Login attempt:', { email: formData.email, password: formData.password })
      console.log('Admin check:', {
        emailMatch: formData.email === ADMIN_EMAIL,
        passwordMatch: formData.password === ADMIN_PASSWORD,
        emailTrim: formData.email.trim() === ADMIN_EMAIL,
        passwordTrim: formData.password.trim() === ADMIN_PASSWORD
      })

      if (formData.email.trim() === ADMIN_EMAIL && formData.password.trim() === ADMIN_PASSWORD) {
        // Admin login - redirect to admin dashboard
        console.log('Admin login detected, redirecting...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Admin login successful! Redirecting to admin dashboard...')
        sessionStorage.setItem('adminLoggedIn', 'true')
        setIsLoading(false)
        window.location.href = '/admin'
        return
      }

      // Regular user login - call Supabase API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 403) {
          // Account pending approval
          alert(`Account Status: ${result.status}\n\n${result.message}`)
        } else {
          // Invalid credentials or other error
          alert(result.error || 'Login failed. Please check your credentials.')
        }
        return
      }

      // Successful login
      console.log('Login successful:', result.user)

      // Store user session (you might want to use a more secure method)
      if (typeof window !== 'undefined') {
        localStorage.setItem('userSession', JSON.stringify(result.user))
      }

      // Redirect to donation page or dashboard
      alert(`Welcome back, ${result.user.fullName}! You can now access the donation platform.`)
      window.location.href = '/donate-food'

    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!forgotEmail) {
      alert('Please enter your email address')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      alert('Please enter a valid email address')
      return
    }

    if (forgotEmail !== 'Eui@admin.com') {
      alert('Email not found. Only admin account can reset password.')
      return
    }

    // Simulate sending reset email
    await new Promise(resolve => setTimeout(resolve, 1500))

    setForgotStep('sent')
  }

  const handleForgotModalClose = () => {
    setShowForgotModal(false)
    setForgotEmail('')
    setForgotStep('email')
  }

  // Load website statistics
  useEffect(() => {
    const loadWebsiteStats = async () => {
      try {
        setStatsLoading(true)
        const response = await fetch('/api/website-stats')
        if (response.ok) {
          const data = await response.json()
          setWebsiteStats(data)
        } else {
          console.error('Failed to load website stats')
        }
      } catch (error) {
        console.error('Error loading website stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    loadWebsiteStats()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <img src="/logo.png" alt="GivingHand Logo" className="h-8 w-8 object-contain" />
              </div>
              <span className="text-2xl font-bold text-gray-900">GivingHand</span>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">About</Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">How It Works</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#45A761] transition-colors font-medium">Contact</Link>
              <Link href="/signup">
                <Button variant="outline" className="border-[#45A761] text-[#45A761] hover:bg-[#45A761] hover:text-white">
                  Sign Up
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome Back</h1>
              <p className="text-gray-600 text-lg">Sign in to your GivingHand account</p>
            </div>

            <Card className="p-8 shadow-lg border-2">
              <CardContent>
                <form onSubmit={handleEmailLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="pl-10 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761]"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761]"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded p-1 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="remember" 
                        className="h-4 w-4 text-[#45A761] focus:ring-[#45A761] border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-sm text-[#45A761] hover:text-[#3a8f52] font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white h-12 text-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-12 hover:bg-red-50 hover:border-red-300 transition-all"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500 mr-2"></div>
                      ) : (
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      )}
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 hover:bg-blue-50 hover:border-blue-300 transition-all"
                      onClick={handleFacebookLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      ) : (
                        <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )}
                      Facebook
                    </Button>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-[#45A761] hover:text-[#3a8f52] font-semibold">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="mt-8 flex justify-center items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Verified Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#45A761] to-[#3a8f52] items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-4xl font-bold mb-6">Join Our Impact Network</h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              {statsLoading ? (
                'Connect with organizations making a difference in their communities through food donation and waste reduction.'
              ) : websiteStats?.totalOrganizations > 0 ? (
                `Connect with ${websiteStats.totalOrganizations} organizations making a difference in their communities through food donation and waste reduction.`
              ) : (
                'Be part of the movement making a difference in communities through food donation and waste reduction.'
              )}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">For Organizations</h3>
                  <p className="text-green-100">Access your dashboard, manage donations, and track your impact</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Community Network</h3>
                  <p className="text-green-100">Connect with local partners and expand your reach</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Global Impact</h3>
                  <p className="text-green-100">Be part of a worldwide movement to reduce waste and feed communities</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : (
                      websiteStats?.totalOrganizations > 0
                        ? `${websiteStats.totalOrganizations}`
                        : 'Growing'
                    )}
                  </div>
                  <div className="text-sm text-green-100">Organizations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {statsLoading ? '...' : (
                      websiteStats?.totalMeals > 0
                        ? `${websiteStats.totalMeals}`
                        : 'Starting'
                    )}
                  </div>
                  <div className="text-sm text-green-100">Meals Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {forgotStep === 'email' ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
                  <button
                    onClick={handleForgotModalClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10 h-12 border-gray-300 focus:border-[#45A761] focus:ring-[#45A761]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleForgotModalClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#45A761] hover:bg-[#3a8f52] text-white"
                    >
                      Send Reset Link
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Reset Link Sent!
                  </h3>

                  <p className="text-gray-600 mb-6">
                    We've sent a password reset link to <strong>{forgotEmail}</strong>.
                    Check your email and follow the instructions to reset your password.
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={handleForgotModalClose}
                      className="w-full bg-[#45A761] hover:bg-[#3a8f52] text-white"
                    >
                      Got it, thanks!
                    </Button>

                    <Link href="/forgot-password" className="block">
                      <Button variant="outline" className="w-full">
                        Open Reset Page
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
