"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
    }

    return (
        <Button variant="outline" onClick={handleLogout} className="cursor-pointer">
            Logout
        </Button>
    )
}