import AboutCard from "@/components/modules/homePage/AboutCard";
import FaqCard from "@/components/modules/homePage/FaqCard";
import FeaturesCard from "@/components/modules/homePage/FeaturesCard";
import HomeCard from "@/components/modules/homePage/HomeCard";

 
const Home = () => {
    return (
        <div>
            <HomeCard></HomeCard>
            <AboutCard></AboutCard>
            <FeaturesCard></FeaturesCard>
            <FaqCard></FaqCard>
        </div>
    );
};

export default Home;