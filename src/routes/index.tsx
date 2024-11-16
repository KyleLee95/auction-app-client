import { createFileRoute } from "@tanstack/react-router";
import { useAuthenticator } from "@aws-amplify/ui-react";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user, signOut } = useAuthenticator();
  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      {/* ... */}
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
