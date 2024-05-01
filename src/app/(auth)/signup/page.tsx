

"use client"
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'


function SigninPage() {

  const { data: session } = useSession()


  if (session) {
    
    return (
      <div>
        <div>
          <div>
            <p>Singed in as { session.user.email }</p>
          </div>


          <div>
            <button onClick={ () => signOut() }>Sign out</button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="p-[1.25rem]">
        <div>
            <p>Not signed in</p>
        </div>


        <div>
            <div>
                <button className="bg-orange-600 px-[1.25rem] py-[0.375rem] rounded-full" onClick={ () => signIn() }> Sign in</button>
            </div>
        </div>
    </div>
  )
}


export default SigninPage

