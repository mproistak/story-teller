import React, { useState } from 'react';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '../../firebase';

const Header = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <header className="horror-header">
      <h1 className="horror-title">Welcome to your daily horror story</h1>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="squiggly-0">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
                seed="0"
              />
              <feDisplacementMap
                id="displacement"
                in="SourceGraphic"
                in2="noise"
                scale="6"
              />
            </filter>
            <filter id="squiggly-1">
              <feTurbulence
                id="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
                seed="1"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
            </filter>
          </defs>
        </svg>
      </div>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in">
          <Image
            onClick={googleSignIn}
            src={'/btn_google_signin_dark_pressed_web.png'}
            alt="sign in with google"
            width={200}
            height={500}
            itemType="button"
          />
        </button>
      )}
    </header>
  );
};

export default Header;
