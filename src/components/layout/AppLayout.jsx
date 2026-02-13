import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 scroll-smooth">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
