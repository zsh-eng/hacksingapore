import { Button } from "@/components/ui/button"

export default function Login() {
    return (
        <div className="flex flex-col w-screen h-screen items-center justify-center">

            <h2 className="flex flex-row justify-center items-center text-xl pb-4">Welcome back!</h2>
            <Button className="bg-red-500 rounded-sm p-4">
                Login via Singpass
            </Button>
        </div>
    )
}