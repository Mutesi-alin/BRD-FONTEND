"use client";  
import Image from 'next/image';

import { Afacad } from "next/font/google";  
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, ChevronDown, DollarSign, ArrowRightCircle, FileText, Globe } from "lucide-react";


const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Homepage = () => {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");
  const [animateHero, setAnimateHero] = useState(false);
  
  // Currency rates data
  const rates = {
    buy: [
      { currency: "USD", rate: 1408.27, change: "+0.5%" },
      { currency: "EUR", rate: 1477.20, change: "-0.2%" },
      { currency: "GBP", rate: 1420, change: "+0.3%" },
    ],
    sell: [
      { currency: "USD", rate: 1150, change: "+0.4%" },
      { currency: "EUR", rate: 1230, change: "-0.1%" },
      { currency: "GBP", rate: 1440, change: "+0.2%" },
    ]
  };

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    setAnimateHero(true);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  return (
    <div className={afacad.className}>
      {/* Navigation Bar with scroll effect */}
      <nav className={`fixed w-full z-50 py-3 px-6 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center z-10">
  <div className={`mr-3 transition-all duration-300 ${scrolled ? "scale-90" : ""}`}>
    {/* Forex logo as an image */}
  <Image src="/images/lllll.png" alt="..." width={50} height={30} />

  </div>
  <div className={`text-3xl font-bold transition-colors duration-300 ${scrolled ? "text-green-600" : "text-white"}`}>NNM FOREX</div>
</div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            <a href="#" className={`font-medium border-b-2 border-green-500 transition-colors duration-300 ${scrolled ? "text-green-600" : "text-white"}`}>HOME</a>
            <a href="#about" className={`font-medium hover:border-b-2 hover:border-green-500 transition-all duration-300 ${scrolled ? "text-gray-800 hover:text-green-600" : "text-gray-200 hover:text-white"}`}>ABOUT US</a>
            <a href="#services" className={`font-medium hover:border-b-2 hover:border-green-500 transition-all duration-300 ${scrolled ? "text-gray-800 hover:text-green-600" : "text-gray-200 hover:text-white"}`}>SERVICES</a>
            <a href="#vision" className={`font-medium hover:border-b-2 hover:border-green-500 transition-all duration-300 ${scrolled ? "text-gray-800 hover:text-green-600" : "text-gray-200 hover:text-white"}`}>VISION</a>
            <a href="#strategic" className={`font-medium hover:border-b-2 hover:border-green-500 transition-all duration-300 ${scrolled ? "text-gray-800 hover:text-green-600" : "text-gray-200 hover:text-white"}`}>STRATEGY</a>
            <a href="#contact" className={`font-medium hover:border-b-2 hover:border-green-500 transition-all duration-300 ${scrolled ? "text-gray-800 hover:text-green-600" : "text-gray-200 hover:text-white"}`}>CONTACT</a>
          </div>
          
          {/* CTA Button */}
          <button className="hidden md:block bg-green-500 text-white px-6 py-2 rounded-md font-medium shadow-md transition duration-300 transform hover:bg-green-600 hover:shadow-lg hover:-translate-y-1">
            GET STARTED
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-green-500 p-2 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-40 bg-green-600 bg-opacity-95 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full justify-center items-center space-y-8 p-8">
            <a href="#" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>HOME</a>
            <a href="#about" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>ABOUT US</a>
            <a href="#services" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>SERVICES</a>
            <a href="#vision" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>VISION & MISSION</a>
            <a href="#strategic" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>STRATEGY</a>
            <a href="#contact" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>CONTACT</a>
            <button className="mt-8 bg-white text-green-600 px-8 py-3 rounded-md font-medium shadow-md transition duration-300 transform hover:shadow-lg hover:-translate-y-1">
              GET STARTED
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with particle background */}
      <div className="relative h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-green-900">
          {/* Dynamic background pattern */}
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
          
          {/* Animated floating elements */}
          <div className="absolute w-64 h-64 bg-green-500 rounded-full opacity-10 -top-20 -right-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-green-700 rounded-full opacity-10 bottom-0 -left-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-8 items-center">
            {/* Text Content - 3 columns */}
            <div className={`md:col-span-3 transition-all duration-1000 ${animateHero ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
              <div className="text-white bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg p-10 rounded-lg border border-white border-opacity-10">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
  Rwanda&apos;s Leading <span className="text-green-400">Forex Trading</span> Partner
</h1>
                <p className="text-lg mb-8 leading-relaxed">
                  Over 10 years of excellence in foreign currency exchange. Regulated by the National Bank of Rwanda and a proud member of Rwanda Forex Bureau Association.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="group bg-green-500 text-white px-8 py-3 rounded-md font-medium shadow-md transition duration-300 transform hover:bg-green-600 hover:shadow-lg hover:-translate-y-1 flex items-center">
                    CONTACT US
                    <ArrowRightCircle className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button className="group border-2 border-white text-white px-8 py-3 rounded-md font-medium transition duration-300 transform hover:bg-white hover:text-green-900 hover:shadow-lg hover:-translate-y-1 flex items-center">
                    OUR SERVICES
                    <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Live Rates Card - 2 columns */}
            <div className={`md:col-span-2 transition-all duration-1000 delay-300 ${animateHero ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-green-600 px-6 py-4 text-white">
                  <h3 className="text-xl font-bold flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Live Exchange Rates
                  </h3>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b">
                  <button 
                    className={`flex-1 py-3 font-medium text-center transition-colors duration-300 ${activeTab === "buy" ? "bg-green-50 text-green-600" : "bg-white text-gray-500"}`}
                    onClick={() => setActiveTab("buy")}
                  >
                    Buy Rates
                  </button>
                  <button 
                    className={`flex-1 py-3 font-medium text-center transition-colors duration-300 ${activeTab === "sell" ? "bg-green-50 text-green-600" : "bg-white text-gray-500"}`}
                    onClick={() => setActiveTab("sell")}
                  >
                    Sell Rates
                  </button>
                </div>
                
                {/* Rates Table */}
             


<div className="p-4">
  <div className="overflow-hidden">
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
        </tr>
      </thead>
      <tbody>
        {rates[activeTab as keyof typeof rates].map((item, index) => (
          <tr key={index} className="border-t">
            <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.currency}</td>
            <td className="px-4 py-3 text-sm text-right font-medium text-gray-800">{item.rate} RWF</td>
            <td className={`px-4 py-3 text-sm text-right font-medium ${item.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {item.change}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="mt-4 text-center">
    <button className="text-green-600 text-sm flex items-center mx-auto hover:text-green-800 transition-colors duration-300">
      View All Rates <ArrowRight className="ml-1 h-4 w-4" />
    </button>
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* About Us Section with scroll reveal */}
      <div id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 text-green-600 text-sm font-semibold tracking-wider">ESTABLISHED 2013</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About NNM Forex Trading Ltd</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Delivering exceptional foreign exchange services with integrity and expertise for over a decade</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
              <Image 
  src="/images/bui.jpeg" 
  alt="NNM Forex Trading office" 
  width={1200} 
  height={800} 
  className="object-cover"
  style={{ width: '100%', height: '100%' }}
/>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 border-4 border-green-200 rounded-lg z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-100 rounded-lg z-0"></div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">A Decade of Excellence in Forex</h3>
              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  NNM Forex Trading Ltd was established in the year 2013 and has been successfully operating for over 10 years. We specialize in dealing with foreign currencies from leading countries of the world that are traded in the Republic of Rwanda.
                </p>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Member of the <span className="font-medium">Rwanda Forex Bureau Association (RFBA)</span>, the umbrella body for all forex bureaus in Rwanda.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Members of the <span className="font-medium">Private Sector Federation of Rwanda (PSF)</span> through the RFBA, part of the service cluster.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">Regulated by the <span className="font-medium">National Bank of Rwanda (NBR)</span> </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="group flex items-center text-green-600 font-medium hover:text-green-800 transition-colors duration-300">
                    Learn more about our history
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section with enhanced design */}
      <div id="vision" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-2 text-green-600 text-sm font-semibold tracking-wider">OUR GUIDING PRINCIPLES</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Vision & Mission</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that drive our business decisions and customer service approach</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-xl border border-gray-100 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 bg-green-50 w-16 h-16 rounded-full flex items-center justify-center text-green-600">
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path 
                    fill="currentColor" 
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the <span className="text-green-600 font-medium">leading forex bureau in Rwanda</span>, recognized for reliability, integrity, and exceptional service in foreign currency exchange, with expanded operations throughout the East African region.
              </p>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center text-gray-500">
                  <FileText className="h-5 w-5 mr-2" />
                  <span>Updated in our 2024-2028 Strategic Plan</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-600 p-10 rounded-xl shadow-xl text-white transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path 
                    fill="currentColor" 
                    d="M3.55 18.54l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8zM11 22.45h2V19.5h-2v2.95zM4 10.5H1v2h3v-2zm11-4.19V1.5H9v4.81C7.21 7.35 6 9.28 6 11.5c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.22-1.21-4.15-3-5.19zm5 4.19v2h3v-2h-3zm-2.76 7.66l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed">
  To provide <span className="font-medium">efficient, transparent, and reliable</span> foreign exchange services that meet the diverse needs of our customers while contributing to Rwanda&#39;s economic growth through ethical business practices and exceptional customer service.
</p>
              
              <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                <div className="flex items-center text-white text-opacity-80">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>Serving Rwanda&#39;s economy since 2013</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide comprehensive forex solutions to meet your currency exchange needs with competitive rates and exceptional service.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-gray-100 transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 text-green-500">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path 
                    fill="currentColor" 
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h1.71v-1.69c1.52-.29 2.72-1.16 2.72-2.78-.01-2.2-1.9-2.96-3.64-3.39z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Currency Exchange</h3>
              <p className="text-gray-600 mb-6">
                Exchange major world currencies at competitive rates with transparent transactions and expert guidance on market trends.
              </p>
              <a href="#" className="text-green-500 hover:text-green-600 flex justify-center items-center font-medium">
                LEARN MORE <span className="ml-1">→</span>
              </a>
            </div>

            {/* Service 2 */}
            <div className="bg-green-500 p-8 rounded-lg shadow-lg text-center text-white transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path 
                    fill="currentColor" 
                    d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Money Transfers</h3>
              <p className="mb-6">
                Fast and secure domestic and international money transfer services to facilitate your business and personal financial needs.
              </p>
              <a href="#" className="text-white hover:text-gray-200 flex justify-center items-center font-medium">
                LEARN MORE <span className="ml-1">→</span>
              </a>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border border-gray-100 transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 text-green-500">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path 
                    fill="currentColor" 
                    d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Banking Agent Services</h3>
              <p className="text-gray-600 mb-6">
                Convenient banking agent services allowing you to perform various banking transactions without visiting your bank branch.
              </p>
              <a href="#" className="text-green-500 hover:text-green-600 flex justify-center items-center font-medium">
                LEARN MORE <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Objectives Section */}
      <div id="strategic" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Strategic Plan 2024-2028</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Our business strategy blueprint is designed to guide our operations and growth over the next five years.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Strategic Objective 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white text-xl font-bold rounded-full mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Expand Business Reach</h3>
              <p className="text-gray-600 mb-6">
                Opening additional branches, increasing capitalization, and diversifying our range of services to reach more customers.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Open new branches in Kigali, Rusizi or Rubavu
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Increase business capitalization
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Introduce bank agent services
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Expand to regional and international transfers
                </li>
              </ul>
            </div>

            {/* Strategic Objective 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white text-xl font-bold rounded-full mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">Enhance Customer Service</h3>
              <p className="text-gray-600 mb-6">
                Improving customer experience through staff training, service standards, and technology adoption.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Annual customer care training for all staff
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Implement customer service charter
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Adopt digital technologies for service delivery
                </li>
              </ul>
            </div>

            {/* Strategic Objective 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white text-xl font-bold rounded-full mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Strengthen Monitoring & Learning</h3>
              <p className="text-gray-600 mb-6">
                Establishing robust data-driven systems to monitor performance and enhance decision-making.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Establish performance tracking mechanisms
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Implement sector evaluation policy
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Establish knowledge sharing mechanisms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">10+</div>
              <div className="text-lg">Years of Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">1000+</div>
              <div className="text-lg">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">150M</div>
              <div className="text-lg">RwF Investment</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-2">5 Yr</div>
              <div className="text-lg">Strategic Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Exchange Currency?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Visit our office for the best rates or contact us to learn more about our services. We&apos;re committed to providing you with a seamless foreign exchange experience..
          </p>
          <button className="bg-green-500 text-white px-10 py-4 rounded-md font-medium text-lg shadow-md transition duration-300 ease-in-out transform hover:bg-green-600 hover:shadow-lg hover:-translate-y-1">
            GET CURRENT RATES
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="text-green-500 mr-2">
                  <div className="w-6 h-6 bg-green-500 relative">
                    <div className="absolute w-4 h-4 bg-white top-1 left-1"></div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-500">NNM FOREX</div>
              </div>
              <p className="text-gray-400">
                Providing expert financial and marketing advisory services since 2013.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">123 KICUKIRO Street</li>
                <li className="text-gray-400">Kigali,Rwanda 10001</li>
                <li className="text-gray-400">+250788350686</li>
                <li className="text-gray-400">info@nnmforex.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest insights</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 w-full rounded-l-md focus:outline-none" />
                <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            © 2025 NNM FOREX TRADING. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;