import React from 'react'
import google from '../../assets/google.png'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../Firebase/FirebaseConfig'


interface GoogleProp{
    closeModal:()=>void
}


const SigninWithGoogle = ({closeModal}:GoogleProp) => {
    
    function googleLogIn(){
        const provider=new GoogleAuthProvider
        signInWithPopup(auth,provider).then(async(result)=>{
            console.log(result);
            if(result.user){ 
                closeModal();
            }
        })
    }
    return (
        <div>
        <p className='continue-p'>--Or Continue with--</p>
        <div className='flex justify-center cursor-pointer' onClick={()=>googleLogIn()}>
            <img src={google} width="60%"/>
        </div>
        </div>
    )
}

export default SigninWithGoogle
