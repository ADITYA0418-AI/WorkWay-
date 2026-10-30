import { useEffect } from 'react';

/**
 * useSeo – lightweight SEO hook that sets document.title and meta description
 * without needing react-helmet-async (avoids HelmetProvider wrapper changes).
 */
export function useSeo({ title, description, canonical }) {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title.includes('WorkWay') ? title : `${title} | WorkWay`;
    }
    // Meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `https://workway.app${canonical}`);
    }

    // Open Graph & Twitter meta tags
    const fullTitle = document.title;
    const ogTags = [
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description || '' },
      { property: 'og:url', content: canonical ? `https://workway.app${canonical}` : window.location.href },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description || '' },
    ];

    ogTags.forEach(({ property, name, content }) => {
      if (!content) return;
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) tag.setAttribute('property', property);
        if (name) tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [title, description, canonical]);
}
