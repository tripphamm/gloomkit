import * as React from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "gatsby-plugin-firebase"

import { App } from "../app/pages/routes"
import { Layout } from "../components/layout"
import { UserProvider, useAuthState } from "../app/providers/auth"

function UserGate({ children }) {
  const { status } = useAuthState()

  const uiConfig = React.useMemo(() => {
    return {
      signInFlow: "redirect",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    }
  }, [])

  if (status === "authenticating") {
    return <div>Authenticating...</div>
  }

  if (status === "signed-out") {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    )
  }

  return <>{children}</>
}

export default function AppPage() {
  return (
    <UserProvider>
      <Layout pageTitle="Gloomkit">
        <UserGate>
          <App />
        </UserGate>
      </Layout>
    </UserProvider>
  )
}