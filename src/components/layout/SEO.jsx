import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    const baseTitle = "Samyak Institute";
    // If title is provided, format it as "Page Title | Samyak Institute", otherwise just base title
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

    const defaultDescription = "Samyak Institute offers premier education with courses in technology, business, and arts. Join us to shape your future with expert guidance and modern learning resources.";
    const defaultKeywords = "education, institute, courses, learning, technology, business, coaching, samyak institute";

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
        </Helmet>
    );
};

export default SEO;
