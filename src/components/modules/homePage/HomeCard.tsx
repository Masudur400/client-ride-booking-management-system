import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import homeBg from "../../../assets/images/home-bg.jpeg"

export default function HomeCard() {
  return (
    <div className="my-5 relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <img 
        src={homeBg} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover" 
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center text-white px-6"
      >
        <h1 className="text-2xl md:text-5xl font-bold mb-4">Book Your Ride, Anytime Anywhere</h1>
        <p className="text-lg mb-6">Fast, reliable, and affordable rides for everyone.</p>
        <Button className="border-2">Get Started</Button>
      </motion.div>
    </div>
  )
}
