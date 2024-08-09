import { Resource } from "sst";
import Form from "@/components/form";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import styles from "./page.module.css";
import NextAuthProvider from "@/components/nextAuthProvider";
import SignIn from "@/components/signIn";

export default async function Home() {
    const command = new PutObjectCommand({
        Key: crypto.randomUUID(),
        Bucket: Resource.MyBucket.name,
    });
    const url = await getSignedUrl(new S3Client({}), command);

    return (
        <main className={styles.main}>
            <NextAuthProvider>
                <Form url={url} />
                <SignIn />
            </NextAuthProvider>
        </main>
    );
}
