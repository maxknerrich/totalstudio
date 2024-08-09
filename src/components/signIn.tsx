"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Button from "./button";

type SignInProps = {
    children?: React.ReactNode;
};

export default function SignIn({ children }: SignInProps) {
    const { data: session, status } = useSession();

    const authenticated = (
        <>
            {children}
            <Button onClick={() => signOut()}>Sign out</Button>
            <br></br>
            Username: {status === "authenticated" && session.user?.name}
        </>
    );

    const unauthenticated = (
        <>
            <h1 className="text-4xl font-bold">Welcome to Totalstudio</h1>
            <Button onClick={() => signIn()}>Sign in</Button>
        </>
    );

    return <div className="flex flex-col gap-4">{status === "authenticated" ? authenticated : unauthenticated}</div>;
}
