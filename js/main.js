document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Lightbox for images
  const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.9); display: none; justify-content: center;
      align-items: center; z-index: 9999; cursor: pointer;
    `;
    const img = document.createElement('img');
    img.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 8px; object-fit: contain;';
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    document.querySelectorAll('.trigger-lightbox').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = el.getAttribute('data-img');
        if (imgSrc) {
          img.src = imgSrc;
          lightbox.style.display = 'flex';
        }
      });
    });
  };
  createLightbox();

  
  // Full Translation Logic
  const msDict = {
    "Where can I try Vibram FiveFingers in Malaysia?": "Di manakah saya boleh mencuba Vibram FiveFingers di Malaysia?",
    "You can try and purchase Vibram FiveFingers at our official Flagship Store located at #03-01, Blok A, Pusat Komersial Pelangi, Jalan Sri Pelangi 4, Taman Pelangi, 80400 Johor Bahru, Johor. Our staff can help you find the perfect fit and model for your needs.": "Anda boleh mencuba dan membeli Vibram FiveFingers di Kedai Utama rasmi kami yang terletak di #03-01, Blok A, Pusat Komersial Pelangi, Jalan Sri Pelangi 4, Taman Pelangi, 80400 Johor Bahru, Johor. Kakitangan kami boleh membantu anda mencari padanan dan model yang sempurna.",
    "Additionally, you can inquire and make purchases through our Facebook and Instagram pages, or shop online via Shopee and Lazada:": "Selain itu, anda boleh membuat pertanyaan dan pembelian melalui halaman Facebook dan Instagram kami, atau membeli-belah dalam talian melalui Shopee dan Lazada:",
    "Shopee": "Shopee",
    "Lazada": "Lazada",
    "COLLECTION": "KOLEKSI",
    "WHY BAREFOOT?": "MENGAPA BERKAKI AYAM?",
    "ACCESS": "AKSES",
    "Open in Maps": "Buka di Peta",
    "Malaysia Debut Collection": "Koleksi Debut Malaysia",
    "Why Barefoot?": "Mengapa Berkaki Ayam?",
    "Why Barefoot Sensation?": "Mengapa Sensasi Berkaki Ayam?",
    "TOE MOBILITY": "MOBILITI JARI KAKI",
    "Freedom of Toes": "Kebebasan Jari Kaki",
    "The independent five-toe design frees your toes. It nurtures the sensation of firmly grasping the ground, supports correct posture and stable walking, and reduces foot fatigue.": "Reka bentuk lima jari bebas membebaskan jari kaki anda. Ia menyokong postur dan berjalan yang stabil, serta mengurangkan keletihan kaki.",
    "BAREFOOT FEEL": "RASA BERKAKI AYAM",
    "Barefoot Sensation": "Sensasi Berkaki Ayam",
    "The ultra-thin sole transmits a direct 'barefoot-like' stimulus to the soles of your feet. It awakens dormant senses and promotes natural, healthy walking.": "Tapak yang sangat nipis memberikan rangsangan 'berkaki ayam' terus ke tapak kaki anda. Ia menggalakkan berjalan secara semula jadi dan sihat.",
    "SOLE VARIETY": "PELBAGAI TAPAK",
    "High-Performance Soles": "Tapak Berprestasi Tinggi",
    "Technologized by a specialized sole manufacturer, optimized for various uses from outdoor rocky areas to gyms. Overwhelming grip and durability support all activities.": "Dioptimumkan untuk pelbagai kegunaan dari kawasan berbatu luar ke gim. Cengkaman dan ketahanan menyokong semua aktiviti.",
    "Frequently Asked Questions": "Soalan Lazim",
    "FAQ": "Soalan Lazim",
    "Access & Info": "Akses & Maklumat",
    "Our vibrant lifestyle store located in the heart of Pelangi, Johor Bahru. Explore the complete collection of Vibram FiveFingers for running, fitness, and daily lifestyle.": "Kedai gaya hidup kami terletak di Pelangi, Johor Bahru. Terokai koleksi lengkap Vibram FiveFingers untuk larian, kecergasan, dan gaya hidup harian.",
    "Address": "Alamat",
    "Business Hours": "Waktu Operasi",
    "Open Daily: 10:00 AM - 9:00 PM": "Buka Setiap Hari: 10:00 AM - 9:00 PM",
    "Phone": "Telefon",
    "Coming Soon": "Akan Datang",
    "Check Route on Google Maps": "Semak Laluan di Peta Google",
    "Store Exterior": "Luaran Kedai",
    "Store Interior": "Dalaman Kedai",
    "Let your feet": "Biarkan kaki anda",
    "MOVE": "BERGERAK",
    "more": "lebih",
    "FREELY": "BEBAS",
    "is available at Pelangi Avenue, Johor Bahru.": "kini terdapat di Pelangi Avenue, Johor Bahru."
  };

  const walkDOM = (node, func) => {
    func(node);
    node = node.firstChild;
    while (node) {
      walkDOM(node, func);
      node = node.nextSibling;
    }
  };

  const translatePage = (lang) => {
    walkDOM(document.body, (node) => {
      // 3 is Node.TEXT_NODE
      if (node.nodeType === 3) {
        let text = node.nodeValue.trim();
        if (text.length > 0) {
          if (!node.originalText) {
            node.originalText = node.nodeValue; // Preserve whitespaces
          }
          
          let trimmedOriginal = node.originalText.trim();
          
          if (lang === 'ms' && msDict[trimmedOriginal]) {
            node.nodeValue = node.originalText.replace(trimmedOriginal, msDict[trimmedOriginal]);
          } else if (lang === 'en') {
            node.nodeValue = node.originalText;
          }
        }
      }
    });
  };

  const btnEn = document.getElementById('btn-en');
  const btnMs = document.getElementById('btn-ms');
  
  if (btnEn && btnMs) {
    btnEn.addEventListener('click', () => {
      btnEn.classList.add('text-vibram-yellow', 'bg-black/[0.03]');
      btnEn.classList.remove('text-black/40', 'hover:text-black');
      btnMs.classList.remove('text-vibram-yellow', 'bg-black/[0.03]');
      btnMs.classList.add('text-black/40', 'hover:text-black');
      translatePage('en');
    });
    
    btnMs.addEventListener('click', () => {
      btnMs.classList.add('text-vibram-yellow', 'bg-black/[0.03]');
      btnMs.classList.remove('text-black/40', 'hover:text-black');
      btnEn.classList.remove('text-vibram-yellow', 'bg-black/[0.03]');
      btnEn.classList.add('text-black/40', 'hover:text-black');
      translatePage('ms');
    });
  }

  // Product Carousels
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dots = container.querySelectorAll('.carousel-dot');
    const total = parseInt(container.getAttribute('data-total'), 10);
    const titlesRaw = container.getAttribute('data-titles');
    const titles = titlesRaw ? JSON.parse(titlesRaw) : null;
    let currentIndex = 0;

    const titleElement = container.nextElementSibling;

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('bg-black/80');
          dot.classList.remove('bg-black/20');
        } else {
          dot.classList.add('bg-black/20');
          dot.classList.remove('bg-black/80');
        }
      });
      
      if (titles && titles[currentIndex] && titleElement) {
        titleElement.textContent = titles[currentIndex];
      }
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + total) % total;
        updateCarousel();
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % total;
        updateCarousel();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });
    
    // Initialize the first title if needed
    updateCarousel();
  });


  // FAQ Toggles
  document.querySelectorAll('#faq button').forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('svg');
      
      // Close all other FAQs
      document.querySelectorAll('#faq button').forEach(otherBtn => {
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.nextElementSibling.classList.add('hidden');
        otherBtn.querySelector('svg').style.transform = 'rotate(0deg)';
      });

      // Toggle current FAQ
      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
});
