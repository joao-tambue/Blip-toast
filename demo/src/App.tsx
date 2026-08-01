import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Playground } from './components/sections/Playground';
import { Installation } from './components/sections/Installation';
import { QuickStart } from './components/sections/QuickStart';
import { ApiReference } from './components/sections/ApiReference';
import { Customization } from './components/sections/Customization';
import { ToastDemoProvider } from './components/demo/ToastDemoProvider';

export default function App() {
  return (
    <ToastDemoProvider>
      <div className="relative min-h-screen overflow-x-clip bg-night text-ink">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Playground />
          <Installation />
          <QuickStart />
          <ApiReference />
          <Customization />
        </main>
        <Footer />
      </div>
    </ToastDemoProvider>
  );
}
