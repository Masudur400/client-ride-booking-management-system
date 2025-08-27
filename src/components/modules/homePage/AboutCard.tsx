import { Button } from "@/components/ui/button"
import AboutBg from "../../../assets/images/about-bg.jpg" 

export default function AboutCard() {
  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-foreground/5 rounded-3xl shadow-lg p-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">About Us</h2>
            <p className="text-foreground/90 md:text-lg leading-relaxed"> We are dedicated to making transportation easier, safer, and more reliable for everyone. 
            Our platform connects riders with trusted drivers, ensuring every journey is smooth, 
            affordable, and enjoyable. With a focus on safety, flexibility, and convenience, 
            we aim to transform urban mobility and provide an exceptional experience for both 
            riders and drivers.
            </p>
          </div>
        </div>
      </section> 

      {/* Our Story Section */}
       <section className="mt-5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-foreground/5 rounded-3xl shadow-lg p-12">
            <h2 className="text-xl md:text-5xl font-bold mb-8 text-foreground">Who We Are</h2>
            <p className="text-foreground/90 md:text-lg leading-relaxed">
              Our mission is to provide a seamless ride experience that puts safety and reliability first. 
              We empower drivers to earn with flexibility while giving riders fast, affordable, and comfortable 
              transportation options. Every feature, every update, and every decision we make is guided by the 
              goal of improving your journey. Whether it’s a daily commute or a quick ride across the city, 
              our platform ensures convenience, trust, and satisfaction every time.
            </p>
          </div>
        </div>
      </section>
      <section className="py-5 ">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Story</h2>
          <p className="text-foreground/90 md:text-lg leading-relaxed">
            We started with a simple idea: to make transportation easier, safer, and affordable for everyone. 
            Over the years, we have connected thousands of riders with reliable drivers, building trust and 
            convenience in every journey.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="pb-10 pt-5 ">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {/* Mission */}
          <div className="  rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img src={AboutBg} alt="Mission" className="  mb-6 object-contain" />
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Our Mission</h3>
            <p className="text-card-foreground/80">
              To provide safe, affordable, and seamless ride experiences for riders while empowering drivers to earn with flexibility.
            </p>
          </div>
          {/* Vision */}
          <div className="  rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img src={AboutBg} alt="Vision" className="  mb-6 object-contain" />
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Our Vision</h3>
            <p className="text-card-foreground/80">
              To revolutionize urban mobility by making ride-sharing safe, reliable, and accessible to everyone.
            </p>
          </div>
          {/* Values */}
          <div className=" rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
            <img src={AboutBg} alt="Values" className=" mb-6 object-contain" />
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Our Values</h3>
            <p className="text-card-foreground/80">
              Safety, reliability, transparency, and customer satisfaction are at the heart of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-5 bg-foreground/5 py-5">
        <div className="max-w-4xl mx-auto px-6 text-center ">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Join Our Journey</h2>
          <p className="mb-8 text-lg md:text-xl text-foreground/90">
            Whether you are a rider or a driver, become a part of our growing community and experience the difference.
          </p>
          <Button variant={'outline'} className="text-foreground">
            Get Started
          </Button>
        </div>
      </section>

    </div>
  )
}
