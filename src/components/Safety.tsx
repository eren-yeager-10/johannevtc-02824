const safetyFeatures = [
  {
    title: "Driver Verification",
    description: "All our drivers are verified and tracked in real-time",
  },
  {
    title: "Trip Sharing",
    description: "Share your location in real-time with your loved ones",
  },
  {
    title: "24/7 Support",
    description: "Our team is available anytime to help you",
  },
];

const Safety = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Your Safety is Our Priority</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We do everything to ensure your safety on every trip
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {safetyFeatures.map((feature) => (
            <div 
              key={feature.title}
              className="border p-6 rounded-lg hover:border-black transition-colors"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Safety;