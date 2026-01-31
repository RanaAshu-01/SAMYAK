const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
            <section>
                <h1 className="text-3xl font-bold mb-4">About Samyak Institute</h1>
                <p className="text-lg text-muted-foreground">
                    Samyak Institute is a premier educational institution dedicated to providing high-quality training in technology and management.
                </p>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                    <p>To bridge the gap between academic learning and industry requirements through practical, hands-on training.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
                    <p>To be the leading institute for skill development and career transformation.</p>
                </div>
            </section>
        </div>
    );
};

export default About;
