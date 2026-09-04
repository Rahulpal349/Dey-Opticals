import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProductCard } from "@/components/ui/ProductCard";
import { 
  Glasses, Sun, Eye, Baby, Monitor, BookOpen, Activity, Tag, 
  Store, Home as HomeIcon, MessageCircle, Headset,
  Star, CheckCircle
} from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Eyeglasses", icon: Glasses, href: "/products?category=eyeglasses" },
    { name: "Sunglasses", icon: Sun, href: "/products?category=sunglasses" },
    { name: "Contact Lenses", icon: Eye, href: "/products?category=contact-lenses" },
    { name: "Kids Glasses", icon: Baby, href: "/products?category=kids" },
    { name: "Computer Glasses", icon: Monitor, href: "/products?category=computer" },
    { name: "Reading Glasses", icon: BookOpen, href: "/products?category=reading" },
    { name: "Sports Glasses", icon: Activity, href: "/products?category=sports" },
    { name: "Offers", icon: Tag, href: "/products?category=offers" },
  ];

  const shapes = [
    "Rectangle", "Cat Eye", "Aviator", "Geometric", "Round", "Clubmaster", "Square"
  ];

  const newArrivals = [
    { id: 1, brand: "Ray-Ban", name: "Classic Wayfarer", price: 5490, mrp: 6500, discountPercent: 15, image: "https://placehold.co/600x450?text=Wayfarer", badge: "NEW" },
    { id: 2, brand: "Oakley", name: "Holbrook Sport", price: 6200, mrp: 7500, discountPercent: 17, image: "https://placehold.co/600x450?text=Holbrook", badge: "Few Left" },
    { id: 3, brand: "Dey Premium", name: "Titanium Rimless", price: 3499, mrp: 5000, discountPercent: 30, image: "https://placehold.co/600x450?text=Rimless", badge: "Best Seller" },
    { id: 4, brand: "Vogue", name: "Cat Eye Elegance", price: 4290, mrp: 4290, image: "https://placehold.co/600x450?text=Cat+Eye" },
    { id: 5, brand: "Tom Ford", name: "Blue Block Pro", price: 12500, mrp: 15000, discountPercent: 16, image: "https://placehold.co/600x450?text=Blue+Block", badge: "NEW" },
    { id: 6, brand: "Dey Basics", name: "Everyday Round", price: 999, mrp: 2000, discountPercent: 50, image: "https://placehold.co/600x450?text=Round", badge: "" },
    { id: 7, brand: "Fastrack", name: "Urban Square", price: 1599, mrp: 1999, discountPercent: 20, image: "https://placehold.co/600x450?text=Square", badge: "" },
    { id: 8, brand: "Carrera", name: "Champion Aviator", price: 8900, mrp: 10500, discountPercent: 15, image: "https://placehold.co/600x450?text=Aviator", badge: "Trending" },
  ];

  const services = [
    { title: "Visit Store", icon: Store, desc: "Find a Dey Opticals near you" },
    { title: "Home Try-On", icon: HomeIcon, desc: "Try 5 frames at home for free" },
    { title: "WhatsApp Order", icon: MessageCircle, desc: "Chat with us to place an order" },
    { title: "Talk to Expert", icon: Headset, desc: "Get style and lens advice" },
  ];

  const testimonials = [
    { id: 1, name: "Avijit Ghorui", product: "Dey Opticals", rating: 5, quote: "My glasses are made by my brother and the glasses are so good. I didn't face any problem for almost two years." },
    { id: 2, name: "shubha deep Das", product: "Dey Opticals", rating: 5, quote: "My experience of this shop is too good 😊 and the behaviour and hospitality is next level. The shop owner Rajdip Da is very sweet and humble 🥰." },
    { id: 3, name: "Sayan Acharya", product: "Dey Opticals", rating: 5, quote: "Fully satisfied with their polite behaviour and service..they are serving good quality of glasses among their valuable consumers..today i got my glass made of blue cut lens, and i am very much happy with it.. 💖" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Banner */}
      <section className="relative w-full bg-primary/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-black/80 to-black/20 flex items-center justify-center">
            {/* Real banner image */}
            <div className="absolute inset-0 bg-[url('/banner1.jpg')] mix-blend-overlay opacity-60 bg-cover bg-center" />
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 py-24 md:py-32 flex flex-col items-start justify-center min-h-[500px]">
          <span className="text-accent font-semibold tracking-wider uppercase mb-4">New Collection 2026</span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6 max-w-2xl leading-tight">
            See the world clearly, <br className="hidden md:block"/> in style.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Discover our premium collection of eyeglasses and sunglasses. Try it, you&apos;ll like it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="font-semibold px-8">Shop Now</Button>
            <Button variant="outline" size="lg" className="font-semibold bg-white/10 text-white border-white hover:bg-white hover:text-primary transition-colors">
              Book Eye Test
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <Card className="flex flex-col items-center justify-center p-6 gap-4 hover:border-accent hover:shadow-md transition-all cursor-pointer h-full group">
                  <div className="p-4 rounded-full bg-primary/5 group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-center text-text">{category.name}</span>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Get the Perfect Shape */}
      <section className="py-10 bg-gray-50 border-y">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-xl font-bold font-heading text-primary mb-6 flex items-center gap-2">
            Get the Perfect Shape
          </h2>
          <div className="flex overflow-x-auto pb-4 gap-3 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {shapes.map((shape) => (
              <Link 
                key={shape} 
                href={`/products?shape=${shape.toLowerCase()}`}
                className="snap-start shrink-0"
              >
                <div className="px-6 py-3 bg-white border rounded-full text-sm font-medium text-text hover:border-primary hover:bg-primary/5 transition-colors whitespace-nowrap shadow-sm">
                  {shape}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. New Arrivals Grid */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary">New Arrivals</h2>
          <Link href="/products" className="text-accent font-medium hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* 5. Nearby Stores & Services */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-10 text-center">At Your Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white/10 rounded-xl hover:bg-white/15 transition-colors border border-white/10">
                  <Icon className="w-10 h-10 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-300">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 container mx-auto px-4 md:px-6 bg-gray-50/50">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-10 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-text">{testimonial.name}</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-xs text-gray-500">Verified Buyer • {testimonial.product}</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-accent text-accent' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">&quot;{testimonial.quote}&quot;</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. Honest Email Capture */}
      <section className="py-20 border-t bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-4">Join the Dey Opticals Family</h2>
          <p className="text-gray-600 mb-8">
            Get 10% off your first order — enter your email below. We promise not to spam your inbox, just honest updates on new collections and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button type="button" size="lg" className="whitespace-nowrap font-semibold">
              Get 10% Off
            </Button>
          </form>
        </div>
      </section>

    </div>
  );
}
