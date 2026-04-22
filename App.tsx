import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingScreen } from './components/LoadingScreen';
import { HLSVideo } from './components/HLSVideo';
import { Navbar } from './components/Navbar';
import { WorkCard } from './components/WorkCard';
import { Explorations } from './components/Explorations';
import { Marquee } from './components/Marquee';
import { cn } from './lib/utils';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["3D Artist", "Product Photographer", "Visualizer", "Digital Creator"];
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        gsap.from(".name-reveal", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.1
        });
        gsap.from(".blur-in", {
          opacity: 0,
          filter: "blur(10px)",
          y: 20,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3
        });
      }, heroRef);
      return () => ctx.revert();
    }
  }, [isLoading]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const skill3D = [
    "Product Modeling", "Studio Lighting", "Texturing & Materials", 
    "UV Mapping", "Photorealistic Rendering", "Product Animation", "Render Optimization"
  ];

  const skillMotion = [
    "Studio Lighting Setup", "Product Photography", "Composition & Framing", 
    "Camera & Lens Knowledge", "Color and Exposure Control"
  ];

  const skillAI = [
    "Quickly create motion from images", "Enhance image quality", 
    "Animate characters from 3D models", "Add AI voiceover to motion"
  ];

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      const href = anchor?.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 1000);
      }
    };
    
    window.addEventListener('click', handleAnchorClick);
    return () => window.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="relative selection:bg-text-primary selection:text-bg">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <main className="relative bg-[#0a0a0a] min-h-screen">
          {/* Background Atmosphere */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#0a0a0a] via-[#121212] to-[#1a1a1a] opacity-50"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[32rem] h-[32rem] atmosphere-glow-top rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[32rem] h-[32rem] atmosphere-glow-bottom rounded-full"></div>
            <div className="absolute inset-0 halftone opacity-[0.03]"></div>
          </div>

          <Navbar />

          {/* Hero Section */}
          <section 
            ref={heroRef} 
            className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10" 
            id="hero"
          >
            <HLSVideo 
              src={VIDEO_URL} 
              className="absolute inset-0 -z-10" 
              overlayClassName="bg-black/30"
            />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent -z-10" />

            <div className="text-center z-10 px-6 max-w-6xl mx-auto">
              <p className="blur-in text-[10px] text-white/40 uppercase tracking-[0.4em] mb-12">
                Hanoi, Viet Nam
              </p>
              <h1 className="name-reveal text-[72px] md:text-[112px] font-display italic leading-[0.85] tracking-tight text-white mb-8">
                Ha Nguyen
              </h1>
              <div className="blur-in text-xl font-light text-white/70 mb-10 h-8">
                A <span key={roleIndex} className="font-display italic text-white font-medium animate-role-fade-in inline-block">
                  {roles[roleIndex]}
                </span> based in Hanoi.
              </div>
              <p className="blur-in text-sm text-white/40 max-w-md mx-auto leading-relaxed mb-12">
                Specializing in photorealistic 3D visualization and professional product photography to bring digital systems to life.
              </p>
              
              <div className="blur-in flex flex-col sm:flex-row gap-5 justify-center items-center">
                <a 
                  href="#work"
                  className="px-10 py-4 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-wider hover:scale-105 transition-transform"
                >
                  View Works
                </a>
                <div className="flex flex-col items-center gap-2">
                  <a 
                    href="#contact"
                    className="px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider hover:border-white/40 transition-all text-white"
                  >
                    Reach out...
                  </a>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
              <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
              <div className="w-px h-16 bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#89AACC] to-transparent animate-scroll-down" />
              </div>
            </div>
          </section>

          {/* About Me Section */}
          <section className="bg-bg py-24 md:py-32 relative z-10 border-b border-stroke" id="about">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                {/* Left side - Image B */}
                <motion.div 
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-5 relative group cursor-pointer"
                >
                  <motion.div 
                    whileHover="hover"
                    className="relative rounded-3xl overflow-hidden border border-stroke bg-surface"
                  >
                    <img 
                      src="https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/672326890_1257071289923446_6868716649779355664_n.png?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeH4v9YTqzQZ1fkjUfdswqXGiyfQsmZV18WLJ9CyZlXXxYmw3VXv63dPp_Muvy4CMMtnQ3rkkZlj5B0QaUScLiyF&_nc_ohc=PCvsIQpdC5cQ7kNvwGPV1GN&_nc_oc=Adpixw99DWCSa6-izUP4tYjEr-t17TeQX2EGQ0JO70BQ60syYAUQWqNx30NeoSkteoQ&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AFb3Txw55DrtRtosH8h4AdkbNsSw2kaNgrMAnV8c5FgFg&oe=6A0FD653" 
                      alt="Work showcase" 
                      className="w-full h-auto"
                    />
                    
                    {/* Creative Elements Overlay - Slides from bottom to top */}
                    <motion.div 
                      variants={{
                        hover: { opacity: 1, y: 0 }
                      }}
                      initial={{ opacity: 0, y: 60 }}
                      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <img 
                        src="https://res.cloudinary.com/dhsomihxj/image/upload/f_auto,q_auto/Gemini_Generated_Image_yy78nbyy78nbyy78_copy2_q9rtiy" 
                        alt="Creative tools" 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right side - Text + Image A */}
                <motion.div 
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-7 space-y-10 md:space-y-12 relative"
                >
                  {/* Floating Image A - Top Right */}
                  <div className="absolute -top-16 right-0 md:top-0 w-24 sm:w-32 md:w-40 z-20">
                    <img 
                      src="https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/671259704_1598895067844187_9069512035951001466_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGRYadVw5iAxHd5AH4kiGszJmwU4h3BgqImbBTiHcGColANiv9Leu-3btBzjfj7IQ34Z-YIR8eQGV9OuS0zAOcz&_nc_ohc=z4Wsew3IGiEQ7kNvwHPnywT&_nc_oc=AdqqKd1MBvXLXccRKhTh1xXorJxh8Snf5ktaD5k-j5pBDHgUk1EwVG54Q3xqW6-NS8Y&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AHSeEeGCgGJ7O-6x2PB9AdW_D9FY9jtV8FOfvmGnSuTkQ&oe=6A0FD7EA" 
                      alt="Artist at work" 
                      className="w-full h-auto rounded-2xl border border-stroke shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-6 pr-0 md:pr-48">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-stroke" />
                      <span className="text-xs text-muted font-medium uppercase tracking-[0.3em]">Biography</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display text-white">About <span className="italic opacity-80">me</span></h2>
                    
                    <div className="space-y-6 text-white/70 leading-relaxed text-base md:text-lg max-w-2xl">
                        <p>
                          <span className="text-white font-medium">Hi, my name is Ha Nguyen. I also go by the name Minhsaau.</span><br />
                          I’m a 3D Artist specializing in product visualization and CGI animations.
                        </p>
                    </div>

                    <div className="text-white/70 leading-relaxed text-base md:text-lg max-w-2xl">
                      <p>
                        3 years of experience in creating high-quality product renders and marketing visuals for international clients. 
                        Skilled in modeling, lighting, texturing, and animation for commercial content.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 pt-10 border-t border-white/10">
                    <div className="space-y-4">
                      <h3 className="text-xs uppercase tracking-widest text-muted font-bold">My Information</h3>
                      <div className="space-y-3 text-sm">
                        <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Name:</span> <span className="text-white">Minh Ha Nguyen</span></p>
                        <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">D.O.B:</span> <span className="text-white">13/10/1996</span></p>
                        <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Location:</span> <span className="text-white">Hanoi, Viet Nam</span></p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xs uppercase tracking-widest text-muted font-bold">Connect</h3>
                      <div className="space-y-3 text-sm">
                        <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Phone:</span> <span className="text-white">[+84] 363 870 807</span></p>
                        <p className="flex justify-between border-b border-white/5 pb-2"><span className="text-white/40">Email:</span> <span className="text-white">ng.m.ha1310@gmail.com</span></p>
                        <div className="flex justify-between gap-4 pt-2">
                           <a href="https://facebook.com/minhsaau" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">Facebook</a>
                           <a href="https://www.instagram.com/saau.gallery/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">Instagram</a>
                           <a href="https://behance.net/minhsaau" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">Behance</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="bg-bg py-24 md:py-32 relative z-10" id="skills">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-20">
                {/* 3D Skills */}
                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true }}
                  className="space-y-12"
                >
                  <div className="space-y-4">
                     <span className="text-xs text-muted font-medium uppercase tracking-[0.3em]">Specialization 01</span>
                     <h2 className="text-4xl md:text-5xl font-display text-white">3D <span className="italic opacity-80">Skills</span></h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {skill3D.map((skill, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full accent-gradient group-hover:scale-150 transition-transform" />
                        <span className="text-sm md:text-base text-white/60 group-hover:text-white transition-colors">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Motion Skills */}
                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-12"
                >
                  <div className="space-y-4">
                     <span className="text-xs text-muted font-medium uppercase tracking-[0.3em]">Specialization 02</span>
                     <h2 className="text-4xl md:text-5xl font-display text-white">Motion <span className="italic opacity-80">Skills</span></h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {skillMotion.map((skill, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full accent-gradient group-hover:scale-150 transition-transform" />
                        <span className="text-sm md:text-base text-white/60 group-hover:text-white transition-colors">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* AI Skills */}
                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-12"
                >
                  <div className="space-y-4">
                     <span className="text-xs text-muted font-medium uppercase tracking-[0.3em]">Specialization 03</span>
                     <h2 className="text-4xl md:text-5xl font-display text-white">AI <span className="italic opacity-80">Skills</span></h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {skillAI.map((skill, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full accent-gradient group-hover:scale-150 transition-transform" />
                        <span className="text-sm md:text-base text-white/60 group-hover:text-white transition-colors">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="bg-bg py-24 md:py-32 relative z-10 border-t border-stroke" id="experience">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
                <div className="md:col-span-4 space-y-4">
                  <span className="text-xs text-muted font-medium uppercase tracking-[0.3em]">Timeline</span>
                  <h2 className="text-4xl md:text-5xl font-display text-white italic">Experience</h2>
                </div>
                
                <div className="md:col-span-8 space-y-20">
                  {/* Freelance */}
                  <motion.div 
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <h3 className="text-2xl md:text-3xl font-display text-white">Freelance 3D Artist</h3>
                      <span className="text-xs text-muted tracking-widest uppercase bg-surface px-3 py-1 rounded-full border border-stroke">Remote | 2023 – Present</span>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Created photorealistic product visualizations for advertising and marketing campaigns.",
                        "Modeled, textured, and rendered products.",
                        "Produced CGI animations highlighting product features for promotional content.",
                        "Collaborated with international clients and delivered projects remotely."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 text-sm md:text-base text-white/50 leading-relaxed group">
                          <div className="w-1 h-1 rounded-full accent-gradient mt-2.5 shrink-0" />
                          <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* In-house */}
                  <motion.div 
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <h3 className="text-2xl md:text-3xl font-display text-white">In-house Product Photographer</h3>
                      <span className="text-xs text-muted tracking-widest uppercase bg-surface px-3 py-1 rounded-full border border-stroke">2017 – 2023</span>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Produced studio product photography for e-commerce and advertising materials.",
                        "Managed lighting setups, camera angles, and product composition.",
                        "Worked closely with marketing teams to create commercial product visuals."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 text-sm md:text-base text-white/50 leading-relaxed group">
                          <div className="w-1 h-1 rounded-full accent-gradient mt-2.5 shrink-0" />
                          <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="bg-bg py-24 relative z-10 border-y border-stroke overflow-hidden" id="tools">
             <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-stroke" />
                  <span className="text-xs text-muted font-medium uppercase tracking-[0.3em]">Toolkit</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display text-white mt-4 italic">My tools</h2>
             </div>

             <div className="flex overflow-hidden whitespace-nowrap">
                <motion.div 
                  className="flex items-center"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      {[
                        { name: "Blender3D", logo: "https://cdn.worldvectorlogo.com/logos/blender-2.svg" },
                        { name: "Premiere Pro", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
                        { name: "After Effects", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" },
                        { name: "Photoshop", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
                        { name: "Illustrator", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
                        { name: "Gemini AI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Gemini_language_model_logo.svg" },
                        { name: "Kling AI", logo: "https://raw.githubusercontent.com/lobehub/lobe-icons/master/assets/kling-color.svg" }, 
                        { name: "Nano Banana", logo: "https://banana.dev/favicon.ico" }
                      ].map((tool, j) => (
                        <div key={j} className="flex items-center px-16 gap-6 group">
                          <div className="w-12 h-12 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                             <img 
                              src={tool.logo} 
                              alt={tool.name} 
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                             />
                          </div>
                          <span className="text-xl font-display uppercase italic text-white/40 group-hover:text-white transition-colors cursor-default whitespace-nowrap">
                            {tool.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
             </div>
          </section>

          {/* Selected Works Section */}
          <section className="bg-bg py-24 md:py-32 relative z-10" id="work">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-stroke" />
                    <span className="text-xs text-muted uppercase tracking-[0.3em]">Portfolio</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-display text-text-primary">
                    Selected <span className="italic opacity-80">Projects</span>
                  </h2>
                </div>
                <a 
                  href="https://www.behance.net/minhsaau" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-2 group text-xs uppercase tracking-widest text-text-primary hover:text-white transition-colors"
                >
                  See more <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
                <WorkCard 
                  title="3D Chocolate Visualization" 
                  img="https://cgit3studio.vn/wp-content/uploads/2025/08/2-copy-2-1536x2048.png" 
                  span="md:col-span-7"
                  href="https://www.behance.net/gallery/205862789/COUPLES-CHOCOLATE-in-3D"
                />
                <WorkCard 
                  title="Vape 3D Motion" 
                  img="https://cgit3studio.vn/wp-content/uploads/2025/11/s3.gif" 
                  span="md:col-span-5" 
                  href="https://www.behance.net/gallery/247221565/CGI-Moodi-Pro-Vape"
                />
                <WorkCard 
                  title="Phone 3D Motion" 
                  img="https://cgit3studio.vn/wp-content/uploads/2026/03/0323-0389_1.gif" 
                  span="md:col-span-5" 
                  href="https://www.behance.net/gallery/247505697/CGI-UPhone-Animation"
                />
                <WorkCard 
                  title="3D Commercial Design" 
                  img="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/516699863_24583673837885623_2784351256376659104_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEOoU-kR-SVsAPPZdOEbleMmhka_P9nCb6aGRr8_2cJvvsMZi1anNFXmei5oqrDkfIBn_FWU6JNA-AtHcGgeYPn&_nc_ohc=FbU0oOjoyB0Q7kNvwHhI-XB&_nc_oc=Adp6A4kGRiScPh3f_hTyYUfyNKc68qq0eCC2yQKkz9iW1MK7sKJl6jew1p-ZZ18GQXc&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=NzKsXAoKQ4fI-FDi6cFPxA&_nc_ss=7a3a8&oh=00_Af0JZVosm08XbcAz0ZG7kV9rK-SC_eAMDEtJkMHrR7JLRA&oe=69EE0A6B" 
                  span="md:col-span-7" 
                  href="https://www.youtube.com/watch?v=rThLTG_UZ5U"
                />
                <WorkCard 
                  title="Cereals Modeling" 
                  img="https://nextcreative.vn/wp-content/uploads/2024/08/vlcsnap-2024-08-21-14h38m19s546.jpg" 
                  span="md:col-span-7" 
                  href="https://nextcreative.vn/project/th-true-yogurt-topcup-tvc/"
                />
                <WorkCard 
                  title="3D Commercial motion" 
                  img="https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/675034845_999934122984631_8879336658725829290_n.png?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFaWCtd3YiWk1KiiBSRdRJCaG6a9D8Anhdobpr0PwCeF5mgpinJP0UU3jeXrJxPRXKCUTkf4zxrfENiVWWmHUF4&_nc_ohc=lGTx16EXa74Q7kNvwGAtmkE&_nc_oc=AdpADsagbwg5_vrQiLyLGyVcIf9o5kA0YzU4XJwVBMLYW0KbhGDpYUjlon5VFa49bv8&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AEs9RFFepK7Sy7I3tZeWo7nniBY7s6dah0yULiEPYQVwg&oe=6A0FD892" 
                  span="md:col-span-5" 
                  href="https://www.facebook.com/thtruefood.vn/videos/843321308496740/"
                />
              </div>
            </div>
          </section>

          <Explorations />

          {/* Contact / Footer */}
          <footer className="relative pt-32 pb-12 overflow-hidden z-10" id="contact">
            <HLSVideo 
              src={VIDEO_URL} 
              className="absolute inset-0 -z-10"
              overlayClassName="bg-black/80"
              flipped
            />
            
            {/* Numbers Section */}
            <div className="mb-24 max-w-[1200px] mx-auto px-6">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="w-8 h-px bg-stroke" />
                <span className="text-xs text-muted font-medium uppercase tracking-[0.3em]">Numbers</span>
                <div className="w-8 h-px bg-stroke" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-display text-white">3+</div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium">Years Experience</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-display text-white">50+</div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium">Projects Completed</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-display text-white">98%</div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium">Happy Clients</p>
                </div>
              </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 text-center space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-display text-text-primary max-w-2xl mx-auto italic">
                  Let's bring your vision to life.
                </h2>
                <p className="text-muted text-sm tracking-[0.1em] uppercase">Available in Hanoi and Worldwide</p>
              </div>
              
              <div className="flex flex-col items-center gap-8">
                <a 
                  href="mailto:ng.m.ha1310@gmail.com" 
                  className="group relative inline-block p-[2px] rounded-full transition-transform hover:scale-105"
                >
                  <div className="absolute inset-0 accent-gradient rounded-full" />
                  <div className="relative bg-bg px-10 py-4 rounded-full">
                    <span className="text-lg font-medium text-text-primary">ng.m.ha1310@gmail.com</span>
                  </div>
                </a>
                
                <div className="text-white/60 text-lg font-light tracking-widest">
                  [+84] 363 870 807
                </div>
              </div>

              <div className="pt-24 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-stroke/50">
                <div className="flex gap-8 text-[11px] text-white/40 font-medium uppercase tracking-[0.2em]">
                  <a href="https://facebook.com/minhsaau" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                  <a href="https://behance.net/minhsaau" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
                  <a href="https://www.instagram.com/saau.gallery/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                </div>
                
                <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-sm px-4 py-2 rounded-full border border-stroke">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-[10px] uppercase tracking-widest text-text-primary">Hanoi, Viet Nam</span>
                </div>
              </div>
              
              <div className="pt-8 text-[10px] text-white/20 uppercase tracking-[0.4em]">
                © 2026 Minh Ha Nguyen • 13/10/1996
              </div>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}
