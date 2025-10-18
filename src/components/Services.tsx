const services = [
  {
    title: "VTC Transport",
    description: "Professional drivers at your service",
    icon: "🚗",
  },
  {
    title: "Events",
    description: "Transportation for your special events",
    icon: "✨",
  },
  {
    title: "Business",
    description: "Transportation solutions for professionals",
    icon: "💼",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-brand-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-brand-burgundy">
          Our Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.title}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-brand-violet">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <button className="mt-6 text-brand-blue font-semibold hover:opacity-70 transition-opacity">
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;