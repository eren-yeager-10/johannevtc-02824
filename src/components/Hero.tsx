
import { useState } from 'react';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const scrollToBooking = () => {
    const bookingSection = document.querySelector('#booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        {!imageLoaded && (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
        <img
          src="https://images.unsplash.com/photo-1515865644861-8bedc4fb8344"
          alt="Aigle Royal background"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-burgundy/80 to-brand-violet/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Travel in Style
          </h1>
          <p className="text-xl mb-8 animate-fade-in">
            Johanne VTC accompanies you on all your journeys with comfort and elegance.
          </p>
          <div className="space-x-4 animate-fade-in">
            <button 
              onClick={scrollToBooking}
              className="bg-brand-burgundy text-white px-6 py-3 rounded hover:opacity-90 transition-opacity"
            >
              Book Now
            </button>
            <button className="bg-white/90 text-brand-black px-6 py-3 rounded hover:bg-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
