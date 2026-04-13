import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="unifesto-page">
      <Navbar />
      <Hero />
      <Events />
      <Footer />
    </main>
  );
}
