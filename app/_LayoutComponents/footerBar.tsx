import React from 'react'

const FooterBar = () => {
  return (
    <div className='h-14 w-full border-t border-muted-foreground flex justify-between items-center'>
        <h1 className='text-foreground'>© 2025 Neil Joseph | All Rights Reserved</h1>
        <div className="text-xs text-muted-foreground">Built using some interesting technologies by Neil J</div>
    </div>
  )
}

export default FooterBar