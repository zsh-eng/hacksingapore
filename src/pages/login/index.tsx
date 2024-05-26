import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Login() {
    return (
        <div className="flex flex-col w-screen h-screen items-center justify-center">

            <h2 className="flex flex-row justify-center items-center text-xl pb-4">Welcome back!</h2>
            <Button className="bg-red-500 rounded-sm p-4">
                <Link href="https://login.singpass.gov.sg/main?scope=openid&response_type=code&redirect_uri=https://www.cpf.gov.sg/eservices/broker/sp/interaction/callback&state=eyJzdGF0ZSI6ImxDUWVfRkczblkxZW5wS3ZQMEFxTUFSN2NpT04xTU9aaVFhaGNpbGVzQm8ifQ%3D%3D&nonce=ydWLJ8W7jMq6eZtFyCFADiWyzoPJkezXmwgqYOuFM34&client_id=yojGKYotEMq2uTFj2fLTTTdNxDaqPeQ3&pwd_enabled=true">
                    Login via Singpass
                </Link>
            </Button>
        </div>
    )
}