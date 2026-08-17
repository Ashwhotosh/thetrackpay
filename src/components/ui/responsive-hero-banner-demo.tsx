import ResponsiveHeroBanner from './responsive-hero-banner';

const HeroDemo = () => {
    return (
        <ResponsiveHeroBanner
            badgeLabel="New"
            badgeText="Now pre-incubated at Nirmaan, IIT Madras"
            title="Track the flow"
            titleLine2="of your money."
            description="TrackPay is the payment app with a financial intelligence layer for India — track, analyze, and automate every rupee across all your accounts in real-time."
            primaryButtonText="Join the Waitlist"
            secondaryButtonText="Watch the Demo"
            ctaButtonText="Join Waitlist"
            partnersTitle="Built for India — NPCI & UPI compliant, secured with AES-256"
        />
    );
};

export default HeroDemo;
