import React from 'react';
import './styles.css';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import Hero from './Components/Hero';
import About from './Components/About';
import Services from './Components/Services';
import Stats from './Components/Stats';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Navigation />
  
      <Hero />
      <About />
      <Services />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
