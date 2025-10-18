
import { useEffect } from 'react';

const RemoveLovableBadge = () => {
  useEffect(() => {
    const removeLovableBadges = () => {
      // Cherche tous les éléments avec data-lovable-badge
      const badges = document.querySelectorAll('[data-lovable-badge]');
      badges.forEach(badge => badge.remove());

      // Cherche aussi dans les iframes
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        try {
          const iframeBadges = iframe.contentDocument?.querySelectorAll('[data-lovable-badge]');
          iframeBadges?.forEach(badge => badge.remove());
        } catch (e) {
          console.log('Iframe access denied');
        }
      });
    };

    // Configure un observateur pour détecter les nouveaux badges
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        removeLovableBadges();
      });
    });

    // Commence l'observation
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Exécute une première fois
    removeLovableBadges();

    // Nettoie l'observateur quand le composant est démonté
    return () => observer.disconnect();
  }, []);

  return null;
};

export default RemoveLovableBadge;
