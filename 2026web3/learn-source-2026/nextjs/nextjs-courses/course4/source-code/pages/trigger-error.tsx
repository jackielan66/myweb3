import React from 'react'

// pages/trigger-error.tsx

export default function TriggerError(){
    throw new Error('trigger error ui')
    return (
        <div>trigger error</div>
    )
}