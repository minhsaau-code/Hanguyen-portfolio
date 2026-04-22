import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export const Explorations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the center content
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax for columns
      gsap.to(".parallax-col-1", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(".parallax-col-2", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items = [
    { id: 1, img: "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/674983302_2702503666791995_7076674212176661516_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFkkPKmuxV13zcNsHVu7856LN335NOhvjos3ffk06G-Ov67QrvGDOlHUMiZUPlNsf3azpcjGgoyMwL9N9Ta_O5x&_nc_ohc=Lsu-X5cVtJIQ7kNvwEq1Oc0&_nc_oc=AdovN4x47TzHwL7sJSTs9l4MVXoGW5CAaHCrczAMBb-oKQYCKicHaMFRKsDw1hro_ns&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AFL3KhZVHHe-Z2DmUy8Ua-rD0KNakLB0jNmupFEsmn36w&oe=6A0FEFBA", rotation: "-4deg" },
    { id: 2, img: "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/671515819_1019313984107620_7836843155336209998_n.png?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGXwPqwaHWaD-JD8ItG0SGVF_19kcog0GUX_X2RyiDQZa3UKmY4UvDPBfyCdMihzqq8aa1VjPJKv7AGDimEcIhN&_nc_ohc=7Gce_AKCXLgQ7kNvwEjJblg&_nc_oc=AdpNYrtg8APDOSpG8LJ0qk-Qhh68oCl9T-zUBebLObHcwXEDSsaPJa32SAWJaf4THeE&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AEgIvfcZxpddjD7UIdVlaoIqYaJWwcedTVogQ8-1nHitw&oe=6A0FDFBD", rotation: "2deg" },
    { id: 3, img: "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/670754251_1515712056566799_1267979758109598314_n.png?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeELvRCbU8q9wDiZuQvYCCfHxnDYFIkbB6HGcNgUiRsHoQeqBBQr5shC1VQsuNoSULWRHEbPSF8CMB3pOTYgHMeI&_nc_ohc=O5K4OiS5ioIQ7kNvwH0hWs6&_nc_oc=AdroK6rpnTDXqvS-12ksTXkCP9YYe_6oqe1WtM6-wcANIt3CPL8IIGhQ-nxxLVSTM8Y&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AEW41i-3jjTHOuV6o_BZrgYk0W7vSWUxhYElqeXf0yWvg&oe=6A0FC45F", rotation: "-2deg" },
    { id: 4, img: "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/674183266_963137220016334_8728019544281124050_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeF6A7pEN93mIktDmosENBOC11EUyyl-edjXURTLKX552OPFmRGjwkwoN-7II6U2shhI5tazO9IjQoDqCqnz74am&_nc_ohc=xpf1KP9K1hYQ7kNvwEy_dAX&_nc_oc=Ado3H64wVe8mU8A4LhvxerpevaLW3kilYAdQh-p4DXYn4U9v_hwCB6U9tEDVCn9RaYw&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AGjDv8xqH9fYuWArNRi07gGRAdWfBNNtpNS8Irz3OC92g&oe=6A0FF0E6", rotation: "4deg" },
    { id: 5, img: "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/671683988_1470003487863701_4483128115359187225_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEmw2YhEG_Q9pTXbBJ-faO7x5zGLtFo08_HnMYu0WjTz9P8O9bA4I3A_5zs659BehzbLBulM80RH4HSVoEC0MJO&_nc_ohc=M6bKo6U9MEoQ7kNvwGncCCt&_nc_oc=Adrv2oNoDOuTHsgnMJaBzgyLIFhzaHPrxP3sYGwrlJNRSheosqx8iTPixtX4Wc43Z2w&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AHIsXA335yRSMNItZa_Lavm6H6Ku3C-_6qJprVRqCKbXA&oe=6A0FD6D9", rotation: "-3deg" },
    { id: 6, img: "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/673532169_808219255295655_865307268519964990_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeH3Gp5QiYyxQtTut6HkkYfkpa19bH9NvP6lrX1sf028_hNSZaTYnTkWft8O0ZSwIfBUxONV207HfVoudTc9tvS3&_nc_ohc=VDpdqCTG7yMQ7kNvwGSvUCd&_nc_oc=Ado6y_OL2mp-j0BJfT77Prx9rpLwCbemzCLgPSQT6kjS1lXthVMOFYJwN3aofVRoevg&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AEBcwn_l35sia5Dsic3YApzv0OMxsJoVJDGXE_o7aWo9g&oe=6A0FD30D", rotation: "3deg" },
  ];

  return (
    <section ref={containerRef} className="min-h-[300vh] relative bg-bg pt-20">
      {/* Pinned Center Content */}
      <div ref={contentRef} className="h-screen w-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Explorations</span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display mb-6">
          Visual <span className="italic">playground</span>
        </h2>
        <p className="max-w-md text-muted text-sm md:text-base mb-8">
          A collection of 3D still renders I created
        </p>
        <a 
          href="https://www.behance.net/minhsaau" 
          target="_blank" 
          rel="noreferrer"
          className="pointer-events-auto group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-primary"
        >
          View on Behance <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>

      {/* Parallax Layers */}
      <div className="absolute inset-0 pointer-events-none z-20 pt-[20vh]">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 gap-12 md:gap-40">
          <div className="parallax-col-1 space-y-40 md:space-y-80">
            {items.filter((_, i) => i % 2 === 0).map((item) => (
              <div 
                key={item.id} 
                className="parallax-item group pointer-events-auto"
                style={{ transform: `rotate(${item.rotation})` }}
              >
                <div className="aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface transition-transform duration-500 group-hover:scale-105">
                  <img src={item.img} alt="Exploration" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
          <div className="parallax-col-2 space-y-40 md:space-y-80 pt-[40vh]">
            {items.filter((_, i) => i % 2 !== 0).map((item) => (
              <div 
                key={item.id} 
                className="parallax-item group pointer-events-auto"
                style={{ transform: `rotate(${item.rotation})` }}
              >
                <div className="aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface transition-transform duration-500 group-hover:scale-105">
                  <img src={item.img} alt="Exploration" className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
