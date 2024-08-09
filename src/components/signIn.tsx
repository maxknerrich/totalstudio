"use client";

import { useSession, signIn as authSignIn, signOut as authSignOut } from "next-auth/react";

export default function ClientComponent() {
    const { data: session, status } = useSession();

    function signOut() {
        authSignOut();
    }

    function signIn() {
        authSignIn(); // Dies leitet automatisch zur Seite /api/auth/signin
    }

    return (
        <div>
            {status === "authenticated" ? <button onClick={() => signOut()}>Sign out</button> : <button onClick={() => signIn()}>Sign in</button>}
            <br></br>
            {status} {status === "authenticated" && session.user?.name}
        </div>
    );
}
