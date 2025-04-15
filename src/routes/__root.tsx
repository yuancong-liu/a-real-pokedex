import { Header } from '@/components/common/header';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex min-h-full w-full max-w-[50rem] grow flex-col px-4 pb-4">
        <Outlet />
      </main>
    </div>
  ),
});
