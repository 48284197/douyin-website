import { NextResponse } from 'next/server'
import { getDatabaseHealth } from '@/lib/db'

export async function GET() {
  try {
    const health = await getDatabaseHealth()
    
    if (health.status === 'healthy') {
      return NextResponse.json(health, { status: 200 })
    } else {
      return NextResponse.json(health, { status: 503 })
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}