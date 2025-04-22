import { Footer } from '@/components/common/footer';
import { Header } from '@/components/common/header';
import { Button } from '@headlessui/react';
import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router';
import { RotateCcwIcon } from 'lucide-react';

export const Route = createRootRoute({
  errorComponent: () => {
    const router = useRouter();

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto grid min-h-full w-full max-w-[50rem] grow place-items-center px-4 pb-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-red-500">Something went wrong!</p>
            <Button
              className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-white underline-offset-4 transition-colors hover:bg-red-400 hover:underline"
              onClick={() =>
                router.navigate({
                  to: '.',
                  search: (prev) => prev,
                  replace: true,
                })
              }
            >
              <RotateCcwIcon size={16} className="text-white" />
              <span>RELOAD</span>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  },
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex min-h-full w-full max-w-[50rem] grow flex-col px-4 pb-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
});
