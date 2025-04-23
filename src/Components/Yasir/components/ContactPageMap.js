import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function ContactPageMap() {
    const [loading, setLoading] = useState(true);
    const [iframeSrc, setIframeSrc] = useState(null); // Initially null to prevent loading

    useEffect(() => {
        // Delay setting the iframe src to control when it loads
        const timer = setTimeout(() => {
            setIframeSrc(
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18813.10216582314!2d74.33750712481402!3d31.517600337441635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f00f21be69%3A0x113ad6b0a9ff8a28!2sWISE%20Group%20of%20Colleges!5e1!3m2!1sen!2s!4v1734546336430!5m2!1sen!2s"
            );
        }, 500); // Optional delay (to simulate loading spinner for some time)

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && <LoadingSpinner />}
            {iframeSrc && (
                <iframe
                    src={iframeSrc}
                    width="100%"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    style={{ border: loading ? 'none' : 'none', height: loading ? '0px' : '450px' }}
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setLoading(false)}
                />
            )}
        </>
    );
}

export default ContactPageMap;
