// use-auth.js

import React, { useState, useEffect, useContext, createContext } from "react";
import { Auth } from "@aws-amplify/auth";

// Implement your particular AWS Amplify configuration
const amplifyConfigurationOptions = {
  userPoolRegion: "us-east-1",
  userPoolId: "us-east-1_WRwQP21lr",
  userPoolWebClientId: "7jgm1vp49qb9l3mq5kqm20iagq",
};

Auth.configure(amplifyConfigurationOptions);

const AuthContext = createContext();

// Wrap your app with <ProvideAuth />
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Access auth values and functions with custom useAuth hook
export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // NOTE: check for user or risk an infinite loop
    if (!user) {
      // On component mount
      // If a session cookie exists
      // Then use it to reset auth state
      Auth.currentSession()
        .then((session) => {
          const { idToken, accessToken } = session;

          console.log(idToken);

          // Define your user schema per your needs
          const user = {
            email: idToken.payload.email,
            username: idToken.payload["cognito:username"],
            userId: idToken.payload.sub,
            accessToken: accessToken.jwtToken,
          };

          setIsSignedIn(true);
          setUser(user);
        })
        .catch((err) => {
          // handle it
        });
    }
  }, [user]);

  const signIn = (username, password) =>
    Auth.signIn(username, password).then((cognitoUser) => {
      // Set user data and access token to memory

      const {
        attributes,
        signInUserSession: { accessToken },
      } = cognitoUser;

      const user = {
        email: attributes.email,
        username: attributes.perfered_username,
        userId: attributes.sub,
        accessToken: accessToken.jwtToken,
      };

      setIsSignedIn(true);
      setUser(user);

      return user;
    });

  const signOut = () =>
    Auth.signOut().then(() => {
      setIsSignedIn(false);
      setUser(null);
    });

  return {
    user,
    isSignedIn,
    signIn,
    signOut,
  };
}
