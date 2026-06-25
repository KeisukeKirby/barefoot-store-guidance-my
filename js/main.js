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

  // Simple Lang switch visual toggle (since full content translation wasn't provided yet)
  const btnEn = document.getElementById('btn-en');
  const btnMs = document.getElementById('btn-ms');
  if (btnEn && btnMs) {
    btnEn.addEventListener('click', () => {
      btnEn.classList.add('text-vibram-yellow', 'bg-black/[0.03]');
      btnEn.classList.remove('text-black/40', 'hover:text-black');
      btnMs.classList.remove('text-vibram-yellow', 'bg-black/[0.03]');
      btnMs.classList.add('text-black/40', 'hover:text-black');
    });
    btnMs.addEventListener('click', () => {
      btnMs.classList.add('text-vibram-yellow', 'bg-black/[0.03]');
      btnMs.classList.remove('text-black/40', 'hover:text-black');
      btnEn.classList.remove('text-vibram-yellow', 'bg-black/[0.03]');
      btnEn.classList.add('text-black/40', 'hover:text-black');
    });
  }
});

  // FAQ toggle
  document.querySelectorAll('#faq button').forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Close all others
      document.querySelectorAll('#faq button').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const icon = b.querySelector('svg');
        icon.style.transform = 'rotate(0deg)';
        icon.classList.replace('text-vibram-yellow', 'text-black/30');
        const content = b.nextElementSibling;
        if (content && content.classList.contains('faq-content')) {
          content.classList.add('hidden');
        }
      });

      // Toggle current
      if (!isExpanded) {
        button.setAttribute('aria-expanded', 'true');
        const icon = button.querySelector('svg');
        icon.style.transform = 'rotate(180deg)';
        icon.classList.replace('text-black/30', 'text-vibram-yellow');
        const content = button.nextElementSibling;
        if (content && content.classList.contains('faq-content')) {
          content.classList.remove('hidden');
        }
      }
    });
  });


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
