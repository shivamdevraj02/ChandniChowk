const About = () => {
    return (
        <section className="about-page">
            <div className="about-hero">
                <div>
                    <p className="eyebrow">About Us</p>
                    <h1>Professional Ecommerce with a Personal Touch</h1>
                    <p>We bring premium products, fast service, and a simple shopping experience to customers who expect quality and convenience.</p>
                </div>
            </div>
            <div className="about-grid">
                <article className="about-card">
                    <h2>Our Mission</h2>
                    <p>To make online shopping effortless by offering curated selections, trusted brands, and reliable delivery for every lifestyle.</p>
                </article>
                <article className="about-card">
                    <h2>Why Choose Us</h2>
                    <ul>
                        <li>Clear product details and smart recommendations</li>
                        <li>Fast order processing with secure checkout</li>
                        <li>Friendly support and easy returns</li>
                    </ul>
                </article>
                <article className="about-card">
                    <h2>Our Promise</h2>
                    <p>We deliver transparency, consistent performance, and a customer-first experience so you can shop with confidence.</p>
                </article>
                <article className="about-card">
                    <h2>Our Vision</h2>
                    <p>To grow as a trusted online destination that balances thoughtful curation with helpful service and modern ecommerce design.</p>
                </article>
            </div>
        </section>
    )
}

export default About;