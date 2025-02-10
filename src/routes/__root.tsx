import { createRootRoute } from "@tanstack/react-router";

import UserTable from '@/components/ReactGrid.tsx';
 
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <UserTable/>
  );
}