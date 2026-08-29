import { getSession } from "@/lib/auth/session";
import AccountMenu from "./account-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserRound } from "lucide-react";
import { cachedResolveDidDoc } from "@/lib/did";

export default async function SessionState() {
  const session = await getSession();
  if (!session) {
    return <LoginButton />;
  }

  const didDoc = await cachedResolveDidDoc(session.did);
  if (!didDoc) {
    return LoginButton();
  }

  return <AccountMenu did={didDoc} />;
}

function LoginButton() {
  return (
    <Link href="/login">
      <Button variant="outline">
        <span className="group-hover:underline">Login</span>
        <UserRound className="size-4" />
      </Button>
    </Link>
  );
}
