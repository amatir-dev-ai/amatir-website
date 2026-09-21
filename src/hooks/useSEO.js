import { useEffect } from 'react';

const useSEO = ({ title, description, keywords, canonical }) => {
    useEffect(() => {
        // 1. Update Title
        const siteName = 'Amatir';
        const fullTitle = title ? `${title}` : siteName;
        document.title = fullTitle;

        // Helper function to update or create meta tags
        const setMetaTag = (attribute, value, content) => {
            if (!content) return;
            let element = document.querySelector(`meta[${attribute}="${value}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, value);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Helper function to update or create link tags (e.g., canonical)
        const setLinkTag = (rel, href) => {
            if (!href) return;
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', rel);
                document.head.appendChild(element);
            }
            element.setAttribute('href', href);
        };

        // 2. Update Meta Description & Keywords
        setMetaTag('name', 'description', description);
        setMetaTag('name', 'keywords', keywords);

        // 3. Update Open Graph (Facebook/Social) Tags
        setMetaTag('property', 'og:title', fullTitle);
        setMetaTag('property', 'og:description', description);

        // 4. Update Twitter Meta Tags
        setMetaTag('name', 'twitter:title', fullTitle);
        setMetaTag('name', 'twitter:description', description);

        // 5. Update Canonical Link
        setLinkTag('canonical', canonical);

    }, [title, description, keywords, canonical]);
};

export default useSEO;