import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center h-screen px-4">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg mb-8">
                Oops—we can&apos;t find the page you're looking for.
            </p>
            <Link href={'/'}>
                <Button>Go back home</Button>
            </Link>
        </main>
    );
}
