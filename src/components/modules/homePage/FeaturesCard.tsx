import { Card, CardContent } from "@/components/ui/card" 
import FaqImg from "../../../assets/images/features-bg.jpeg"

const features = [
    { img: FaqImg, title: "Easy Booking", desc: "Book rides in seconds with our fast and simple process." },
    { img: FaqImg, title: "Safe & Secure", desc: "Verified drivers and safety measures for peace of mind." },
    { img: FaqImg, title: "On Time", desc: "Always punctual with real-time ride tracking." }
  ];

export default function FeaturesCard() {
  return (
    <section className="relative py-10 flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <Card key={i} className="rounded-xl shadow-xl hover:shadow-lg transition-transform transform hover:-translate-y-2 ">
                <CardContent className="py-2 flex flex-col items-center text-center">
                  {/* Feature Image */}
                  <img src={f.img} alt={f.title} className="w-full   mb-6 object-contain" />
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-foreground/90">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> 
      </section>
  )
}
