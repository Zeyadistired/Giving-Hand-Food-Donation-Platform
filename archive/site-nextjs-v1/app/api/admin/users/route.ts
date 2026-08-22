import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getAllUsers, mapUserToLegacy, updateUserApprovalStatus } from '@/lib/database-adapter'

// Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here

    const users = await getAllUsers()

    // Map to legacy format for backward compatibility
    const legacyUsers = users.map(mapUserToLegacy)

    return NextResponse.json({ users: legacyUsers })

  } catch (error) {
    console.error('Admin users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update user approval status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here

    const body = await request.json()
    const { userId, approved, status, rejectionReason } = body

    // Handle both new (approved boolean) and legacy (status string) formats
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    let finalApproved: boolean

    if (typeof approved === 'boolean') {
      // New format: approved boolean
      finalApproved = approved
    } else if (status) {
      // Legacy format: status string
      if (!['pending', 'approved', 'rejected'].includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status' },
          { status: 400 }
        )
      }
      finalApproved = status === 'approved'
    } else {
      return NextResponse.json(
        { error: 'Either approved (boolean) or status (string) is required' },
        { status: 400 }
      )
    }

    const updatedUser = await updateUserApprovalStatus(userId, finalApproved)
    const legacyUser = mapUserToLegacy(updatedUser)

    return NextResponse.json({
      message: 'User status updated successfully',
      user: legacyUser
    })

  } catch (error) {
    console.error('Admin user update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


