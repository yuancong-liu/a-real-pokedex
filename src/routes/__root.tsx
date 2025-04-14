import { Header } from '@/components/common/header';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Header />
        <main className="isolate m-auto max-w-[50rem] px-4 pb-4">
          <Outlet />
        </main>
      </>
    );
  },
});
