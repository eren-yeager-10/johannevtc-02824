const Footer = () => {
  return (
    <footer className="bg-brand-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-brand-burgundy">Entreprise</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-violet transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-brand-burgundy">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-violet transition-colors">Transport VTC</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Événements</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Entreprises</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-brand-burgundy">Sécurité</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-violet transition-colors">Centre de sécurité</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Communauté</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Normes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-brand-burgundy">Aide</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-violet transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-sm">© 2024 Johanne VTC. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;