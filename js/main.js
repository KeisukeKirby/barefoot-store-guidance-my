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
      background: rgba(0,0,0,0.9); display: none; overflow: auto;
      z-index: 9999;
    `;
    
    const imgContainer = document.createElement('div');
    imgContainer.style.cssText = 'position: relative; display: flex; justify-content: center; align-items: center; width: 100%; min-height: 100%; padding: 2rem; box-sizing: border-box; cursor: pointer;';
    
    const img = document.createElement('img');
    img.style.cssText = 'max-width: 100%; max-height: 90vh; border-radius: 8px; object-fit: contain; cursor: zoom-in; transition: transform 0.3s ease;';
    
    const zoomBtn = document.createElement('button');
    zoomBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>';
    zoomBtn.style.cssText = `
      position: fixed; bottom: 30px; right: 30px; background: white; color: black; border: none; 
      border-radius: 50%; width: 50px; height: 50px; display: flex; justify-content: center; 
      align-items: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 10000;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>';
    closeBtn.style.cssText = `
      position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.5); color: white; border: none; 
      border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; 
      align-items: center; cursor: pointer; z-index: 10000;
    `;

    let isZoomed = false;
    
    const toggleZoom = (e) => {
      if (e) e.stopPropagation();
      isZoomed = !isZoomed;
      if (isZoomed) {
        img.style.maxHeight = 'none';
        img.style.maxWidth = 'none';
        // Make it wide enough to read the text but not overwhelmingly large
        if (window.innerWidth > 768) {
          img.style.width = '50%';
        } else {
          img.style.width = '100%';
        }
        img.style.height = 'auto';
        img.style.cursor = 'zoom-out';
        imgContainer.style.alignItems = 'flex-start';
        imgContainer.style.justifyContent = 'center';
        zoomBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>';
      } else {
        img.style.maxHeight = '90vh';
        img.style.maxWidth = '100%';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.cursor = 'zoom-in';
        imgContainer.style.alignItems = 'center';
        imgContainer.style.justifyContent = 'center';
        zoomBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>';
      }
    };
    
    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
      if (isZoomed) toggleZoom(); // Reset zoom
    };

    zoomBtn.addEventListener('click', toggleZoom);
    img.addEventListener('click', toggleZoom);
    
    imgContainer.addEventListener('click', (e) => {
      if (e.target === imgContainer) closeLightbox();
    });
    
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    imgContainer.appendChild(img);
    lightbox.appendChild(imgContainer);
    lightbox.appendChild(zoomBtn);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    document.querySelectorAll('.trigger-lightbox').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = el.getAttribute('data-img');
        if (imgSrc) {
          img.src = imgSrc;
          lightbox.style.display = 'block'; // Block instead of flex to allow scrolling
          document.body.style.overflow = 'hidden';
        }
      });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
  };
  createLightbox();

  
  // Full Translation Logic
  const msDict = {
    "Shopee": "Shopee",
    "Lazada": "Lazada",
    "COLLECTION": "KOLEKSI",
    "WHY BAREFOOT?": "MENGAPA BERKAKI AYAM?",
    "ACCESS": "AKSES",
    "Open in Maps": "Buka di Peta",
    "Product Lineup": "Barisan Produk",
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
    "Our lifestyle store located in the heart of Johor Bahru. Explore our collection of Vibram FiveFingers for running, fitness, and daily lifestyle.": "Kedai gaya hidup kami terletak di pusat Johor Bahru. Terokai koleksi Vibram FiveFingers kami untuk larian, kecergasan, dan gaya hidup harian.",
    "Address": "Alamat",
    "Business Hours": "Waktu Operasi",
    "Open Daily: 10:00 AM - 9:00 PM": "Buka Setiap Hari: 10:00 AM - 9:00 PM",
    "Phone": "Telefon",
    "Coming Soon": "Akan Datang",
    "Wed-Thu: 10am - 6pm<br>Fri-Sun: 10am - 7pm<br>(Monday and Tuesday are closed.)": "Rabu-Khamis: 10am - 6pm<br>Jumaat-Ahad: 10am - 7pm<br>(Isnin dan Selasa ditutup.)",
    "Check Route on Google Maps": "Semak Laluan di Peta Google",
    "Store Exterior": "Luaran Kedai",
    "Store Interior": "Dalaman Kedai",
    "Let your feet": "Biarkan kaki anda",
    "MOVE": "BERGERAK",
    "more": "lebih",
    "FREELY": "BEBAS",
    "is now officially open at Pelangi Avenue, Johor Bahru!": "kini dibuka secara rasmi di Pelangi Avenue, Johor Bahru!",
    "MOVE FREELY.": "BERGERAK BEBAS.",
    "Your Connection To Earth": "Sambungan Anda Ke Bumi",
    "Experience the ultimate connection to the earth with Vibram Five Fingers. Our revolutionary footwear allows your feet to move naturally, awakening sensory feedback and promoting healthier movement. Watch our brand story to discover the true feeling of barefoot freedom.": "Alami sambungan mutlak ke bumi dengan VFF FiveFingers. Kasut revolusioner kami membolehkan kaki anda bergerak secara semula jadi, membangkitkan maklum balas deria dan menggalakkan pergerakan yang lebih sihat. Tonton kisah jenama kami untuk meneroka rasa sebenar kebebasan berkaki ayam.",
    "What are Vibram FiveFingers?": "Apakah itu Vibram FiveFingers?",
    "Vibram FiveFingers are minimalist barefoot shoes with individual toe compartments, designed to mimic the natural feeling of walking barefoot while providing ground protection. Made by Vibram, the world's leading sole manufacturer, they feature ultra-thin yet durable soles that let your feet move naturally.": "Vibram FiveFingers ialah kasut minimalis berkaki ayam dengan petak jari kaki individu, direka untuk meniru rasa semula jadi berjalan tanpa kasut sambil memberikan perlindungan pada tapak kaki. Dibuat oleh Vibram, pengeluar tapak kasut terkemuka di dunia, kasut ini menampilkan tapak yang sangat nipis namun tahan lasak yang membolehkan kaki anda bergerak secara semula jadi.",
    "What are the benefits of barefoot shoes?": "Apakah faedah kasut berkaki ayam?",
    "Barefoot shoes offer numerous benefits: they strengthen foot and leg muscles, improve balance and posture, enhance sensory feedback from the ground, promote natural gait patterns, and can help reduce joint pain. The thin sole awakens thousands of nerve endings in your feet, reconnecting you with your body's natural movement.": "Kasut berkaki ayam menawarkan pelbagai faedah: ia menguatkan otot kaki dan betis, memperbaiki keseimbangan dan postur, meningkatkan maklum balas deria dari tanah, menggalakkan corak gaya berjalan semula jadi, dan boleh membantu mengurangkan sakit sendi. Tapak yang nipis membangkitkan ribuan hujung saraf di tapak kaki anda, menyambung semula anda dengan pergerakan semula jadi tubuh anda.",
    "Can barefoot shoes help with foot pain or posture problems?": "Bolehkah kasut berkaki ayam membantu dengan sakit kaki atau masalah postur?",
    "Many users report significant improvement in foot pain, plantar fasciitis, knee pain, and postural issues after transitioning to barefoot shoes. By allowing your feet to move naturally without restrictive cushioning or arch support, your foot muscles strengthen over time, leading to better alignment and reduced pain. However, a gradual transition is recommended.": "Ramai pengguna melaporkan peningkatan ketara dalam sakit kaki, plantar fasciitis, sakit lutut, dan masalah postur selepas beralih kepada kasut berkaki ayam. Dengan membenarkan kaki anda bergerak secara semula jadi tanpa kusyen yang menyekat atau sokongan lengkung, otot kaki anda menjadi kuat dari semasa ke semasa, yang membawa kepada postur yang lebih baik dan mengurangkan rasa sakit. Walau bagaimanapun, peralihan secara beransur-ansur adalah disyorkan.",
    "How should I transition to barefoot shoes?": "Bagaimanakah saya harus beralih kepada kasut berkaki ayam?",
    "Transitioning should be gradual to allow your muscles, tendons, and skin to adapt. Start by wearing them for short periods (1-2 hours) during daily activities. Gradually increase the duration and intensity over several weeks before using them for long runs or intense workouts. Listen to your body and rest if you feel unusual soreness.": "Peralihan harus dilakukan secara beransur-ansur untuk membolehkan otot, tendon, dan kulit anda menyesuaikan diri. Mulakan dengan memakainya untuk tempoh yang singkat (1-2 jam) semasa aktiviti harian. Tingkatkan secara beransur-ansur tempoh dan intensiti selama beberapa minggu sebelum menggunakannya untuk larian jauh atau senaman yang intensif. Dengar isyarat tubuh anda dan berehat jika anda berasa sakit yang luar biasa.",
    "What activities are Vibram FiveFingers suitable for?": "Apakah aktiviti yang sesuai untuk Vibram FiveFingers?",
    "Vibram FiveFingers are versatile shoes suitable for a wide range of activities: running, hiking, gym workouts, CrossFit, yoga, water sports, casual walking, and travel. Different models are optimized for different activities, with sole compounds designed for specific terrains—from rocky trails to gym floors.": "Vibram FiveFingers ialah kasut serba boleh yang sesuai untuk pelbagai jenis aktiviti: larian, mendaki, senaman gim, CrossFit, yoga, sukan air, berjalan santai, dan melancong. Model-model yang berbeza dioptimumkan untuk aktiviti yang berbeza, dengan sebatian tapak yang direka untuk rupa bumi tertentu—dari denai berbatu hingga lantai gim.",
    "Order & Inquiry": "Pesanan & Pertanyaan",
    "Additionally, you can inquire and make purchases through our Facebook and Instagram pages, or shop online via ": "Selain itu, anda boleh membuat pertanyaan dan pembelian melalui halaman Facebook dan Instagram kami, atau membeli-belah dalam talian melalui ",
    " and ": " dan ",
    ".": ".",
    "Campaign Period:": "Tempoh Kempen:",
    "Our store is located at PELANGI AVENUE Block A, Lot 3, Level 1": "Kedai kami terletak di PELANGI AVENUE Block A, Lot 3, Level 1",
    "Enlarge Map": "Besarkan Peta",
    "Check Size Chart": "Semak Carta Saiz",
    "Where can I try Vibram FiveFingers in Malaysia?": "Di manakah saya boleh mencuba Vibram FiveFingers di Malaysia?",
    "You can try and purchase Vibram FiveFingers at our flagship lifestyle store located at Pelangi Avenue, Johor Bahru. Our trained staff will help you find the perfect fit and model for your needs.": "Anda boleh mencuba dan membeli Vibram FiveFingers di kedai gaya hidup utama kami yang terletak di Pelangi Avenue, Johor Bahru. Kakitangan kami yang terlatih akan membantu anda mencari saiz dan model yang paling sesuai untuk keperluan anda.",
    "10% OFF ALL ITEMS": "10% DISKAUN SEMUA BARANGAN",
    "MORE DETAILS, CLICK 👆": "MAKLUMAT LANJUT, KLIK 👆"
  };

const zhDict = {
    "Shopee": "Shopee",
    "Lazada": "Lazada",
    "COLLECTION": "产品系列",
    "WHY BAREFOOT?": "为何选择赤足？",
    "ACCESS": "交通位置",
    "Open in Maps": "在地图中打开",
    "Product Lineup": "产品阵容",
    "Why Barefoot?": "为何选择赤足？",
    "Why Barefoot Sensation?": "为何选择赤足感？",
    "TOE MOBILITY": "脚趾灵活性",
    "Freedom of Toes": "脚趾的自由",
    "The independent five-toe design frees your toes. It nurtures the sensation of firmly grasping the ground, supports correct posture and stable walking, and reduces foot fatigue.": "独立的五趾设计释放您的脚趾。它培养紧紧抓住地面的感觉，支持正确的姿势和稳定的行走，并减少脚部疲劳。",
    "BAREFOOT FEEL": "赤足感",
    "Barefoot Sensation": "赤足体验",
    "The ultra-thin sole transmits a direct 'barefoot-like' stimulus to the soles of your feet. It awakens dormant senses and promotes natural, healthy walking.": "超薄的鞋底将直接的“赤足般”刺激传递到您的脚底。它唤醒休眠的感官并促进自然、健康的行走。",
    "SOLE VARIETY": "多样化的鞋底",
    "High-Performance Soles": "高性能鞋底",
    "Technologized by a specialized sole manufacturer, optimized for various uses from outdoor rocky areas to gyms. Overwhelming grip and durability support all activities.": "由专业鞋底制造商提供技术支持，针对从户外岩石区到健身房的各种用途进行了优化。压倒性的抓地力和耐用性支持所有活动。",
    "Frequently Asked Questions": "常见问题解答",
    "FAQ": "常见问题",
    "Access & Info": "交通与信息",
    "Our lifestyle store located in the heart of Johor Bahru. Explore our collection of Vibram FiveFingers for running, fitness, and daily lifestyle.": "我们的生活体验店位于新山的中心地带。探索我们适用于跑步、健身和日常生活的 Vibram FiveFingers 系列。",
    "Address": "地址",
    "Business Hours": "营业时间",
    "Open Daily: 10:00 AM - 9:00 PM": "每日营业：10:00 AM - 9:00 PM",
    "Phone": "电话",
    "Coming Soon": "即将推出",
    "Wed-Thu: 10am - 6pm<br>Fri-Sun: 10am - 7pm<br>(Monday and Tuesday are closed.)": "周三-周四: 10am - 6pm<br>周五-周日: 10am - 7pm<br>(周一和周二休息)",
    "Check Route on Google Maps": "在Google地图上查看路线",
    "Store Exterior": "店铺外观",
    "Store Interior": "店铺内景",
    "Let your feet": "让您的双脚",
    "MOVE": "自由",
    "more": "移动",
    "FREELY": "更自由",
    "is now officially open at Pelangi Avenue, Johor Bahru!": "现已在柔佛新山 Pelangi Avenue 正式开业！",
    "MOVE FREELY.": "自由移动。",
    "Your Connection To Earth": "您与地球的连接",
    "Experience the ultimate connection to the earth with Vibram Five Fingers. Our revolutionary footwear allows your feet to move naturally, awakening sensory feedback and promoting healthier movement. Watch our brand story to discover the true feeling of barefoot freedom.": "穿上 Vibram FiveFingers，体验与地球的终极连接。我们革命性的鞋类让您的双脚自然移动，唤醒感官反馈并促进更健康的运动。观看我们的品牌故事，发现真正的赤足自由感。",
    "What are Vibram FiveFingers?": "什么是 Vibram FiveFingers？",
    "Vibram FiveFingers are minimalist barefoot shoes with individual toe compartments, designed to mimic the natural feeling of walking barefoot while providing ground protection. Made by Vibram, the world's leading sole manufacturer, they feature ultra-thin yet durable soles that let your feet move naturally.": "Vibram FiveFingers 是简约的赤足鞋，具有独立的脚趾隔层，旨在模仿赤足行走的自然感觉，同时提供地面保护。由全球领先的鞋底制造商 Vibram 制造，它们采用超薄耐用的鞋底，让您的双脚自然移动。",
    "What are the benefits of barefoot shoes?": "赤足鞋有什么好处？",
    "Barefoot shoes offer numerous benefits: they strengthen foot and leg muscles, improve balance and posture, enhance sensory feedback from the ground, promote natural gait patterns, and can help reduce joint pain. The thin sole awakens thousands of nerve endings in your feet, reconnecting you with your body's natural movement.": "赤足鞋提供许多好处：它们增强足部和腿部肌肉，改善平衡和姿势，增强地面的感官反馈，促进自然的步态模式，并有助于减少关节疼痛。薄鞋底唤醒您足部的数千个神经末梢，让您重新连接身体的自然运动。",
    "Can barefoot shoes help with foot pain or posture problems?": "赤足鞋能帮助缓解足部疼痛或姿势问题吗？",
    "Many users report significant improvement in foot pain, plantar fasciitis, knee pain, and postural issues after transitioning to barefoot shoes. By allowing your feet to move naturally without restrictive cushioning or arch support, your foot muscles strengthen over time, leading to better alignment and reduced pain. However, a gradual transition is recommended.": "许多用户报告在改穿赤足鞋后，足部疼痛、足底筋膜炎、膝盖疼痛和姿势问题有显著改善。通过让您的双脚自然移动，而没有限制性的缓冲或足弓支撑，您的足部肌肉会随着时间的推移而增强，从而改善身体排列并减轻疼痛。不过，建议循序渐进地过渡。",
    "How should I transition to barefoot shoes?": "我该如何过渡到赤足鞋？",
    "Transitioning should be gradual to allow your muscles, tendons, and skin to adapt. Start by wearing them for short periods (1-2 hours) during daily activities. Gradually increase the duration and intensity over several weeks before using them for long runs or intense workouts. Listen to your body and rest if you feel unusual soreness.": "过渡应该是循序渐进的，以让您的肌肉、肌腱和皮肤适应。首先在日常活动中短时间穿着（1-2小时）。在将其用于长跑或剧烈运动之前，在几周内逐渐增加持续时间和强度。倾听您的身体，如果感到异常酸痛，请休息。",
    "What activities are Vibram FiveFingers suitable for?": "Vibram FiveFingers 适合哪些活动？",
    "Vibram FiveFingers are versatile shoes suitable for a wide range of activities: running, hiking, gym workouts, CrossFit, yoga, water sports, casual walking, and travel. Different models are optimized for different activities, with sole compounds designed for specific terrains—from rocky trails to gym floors.": "Vibram FiveFingers 是一款多功能鞋，适合各种活动：跑步、远足、健身房锻炼、CrossFit、瑜伽、水上运动、休闲散步和旅行。不同的型号针对不同的活动进行了优化，鞋底混合物专为特定地形设计——从岩石小径到健身房地板。",
    "Order & Inquiry": "订购与咨询",
    "Additionally, you can inquire and make purchases through our Facebook and Instagram pages, or shop online via ": "此外，您可以通过我们的 Facebook 和 Instagram 页面进行咨询和购买，或通过 ",
    " and ": " 和 ",
    ".": " 在线购物。",
    "Campaign Period:": "活动期间：",
    "Our store is located at PELANGI AVENUE Block A, Lot 3, Level 1": "本店位于 PELANGI AVENUE Block A, Lot 3, Level 1",
    "Enlarge Map": "放大地图",
    "Check Size Chart": "查看尺码表",
    "Where can I try Vibram FiveFingers in Malaysia?": "我在马来西亚哪里可以试穿 Vibram FiveFingers？",
    "You can try and purchase Vibram FiveFingers at our flagship lifestyle store located at Pelangi Avenue, Johor Bahru. Our trained staff will help you find the perfect fit and model for your needs.": "您可以前往位于柔佛新山 Pelangi Avenue 的旗舰生活体验店试穿并购买 Vibram FiveFingers。我们训练有素的员工将为您找到最适合您需求的款式。",
    "10% OFF ALL ITEMS": "全场 9 折",
    "MORE DETAILS, CLICK 👆": "查看详情请点击👆"
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
          } else if (lang === 'zh' && zhDict[trimmedOriginal]) {
            node.nodeValue = node.originalText.replace(trimmedOriginal, zhDict[trimmedOriginal]);
          } else if (lang === 'en') {
            node.nodeValue = node.originalText;
          }
        }
      }
    });
  };

  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      translatePage(e.target.value);
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
    const sizesRaw = container.getAttribute('data-sizes');
    const sizes = sizesRaw ? JSON.parse(sizesRaw) : null;
    let currentIndex = 0;

    const titleElement = container.nextElementSibling;
    const sizeElement = titleElement ? titleElement.nextElementSibling : null;

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
      
      if (sizes && sizes[currentIndex] && sizeElement && sizeElement.classList.contains('product-size')) {
        sizeElement.textContent = "Size: " + sizes[currentIndex];
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
  const faqBtns = document.querySelectorAll('#faq button');
  console.log('Found FAQ buttons:', faqBtns.length);
  
  faqBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Prevent default to ensure it doesn't navigate if it's somehow wrapped
      e.preventDefault();
      
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('svg');
      
      console.log('FAQ clicked! Currently expanded:', isExpanded);
      
      // Close all other FAQs
      document.querySelectorAll('#faq button').forEach(otherBtn => {
        otherBtn.setAttribute('aria-expanded', 'false');
        if (otherBtn.nextElementSibling) {
          otherBtn.nextElementSibling.classList.add('hidden');
        }
        const otherIcon = otherBtn.querySelector('svg');
        if (otherIcon) {
          otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current FAQ
      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        if (content) {
          content.classList.remove('hidden');
        }
        if (icon) {
          icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });


  
  });
