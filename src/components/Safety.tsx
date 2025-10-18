const safetyFeatures = [
  {
    title: "Vérification des chauffeurs",
    description: "Tous nos chauffeurs sont vérifiés et suivis en temps réel",
  },
  {
    title: "Partage de trajet",
    description: "Partagez votre position en temps réel avec vos proches",
  },
  {
    title: "Assistance 24/7",
    description: "Notre équipe est disponible à tout moment pour vous aider",
  },
];

const Safety = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Votre sécurité est notre priorité</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous mettons tout en œuvre pour assurer votre sécurité à chaque trajet
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