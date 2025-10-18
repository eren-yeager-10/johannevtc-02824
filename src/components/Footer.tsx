const Footer = () => {
  return (
    <footer className="bg-brand-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-brand-burgundy">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-violet transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-brand-burgundy">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-violet transition-colors">VTC Transport</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Business</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-brand-burgundy">Safety</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-violet transition-colors">Safety Center</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Standards</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-brand-burgundy">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-violet transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-violet transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-sm">© 2024 Johanne VTC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;