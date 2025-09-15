document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE MENU TOGGLE ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent background scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            header.style.background = 'var(--dark-color)';
        } else {
            document.body.style.overflow = '';
            header.style.background = '';
        }
    });

    // ========== STICKY HEADER ==========
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // ========== ANIMATED STATS COUNTER ==========
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const animateValue = (element, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                
                if (element.getAttribute('data-count') === '2.5') {
                    element.textContent = (progress * (end - start) + start).toFixed(1) + 'M';
                } else {
                    element.textContent = value.toLocaleString();
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const stats = document.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-count'));
                    animateValue(stat, 0, target, 2000);
                });
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ========== LAZY LOAD IMAGES ==========
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.removeAttribute('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    };
    lazyLoadImages();

    // ========== VIDEO HOVER EFFECTS ==========
    const setupVideoHover = () => {
        const videoItems = document.querySelectorAll('.video-item');
        
        videoItems.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                item.addEventListener('mouseenter', () => {
                    video.play().catch(e => console.log('Video play failed:', e));
                });
                
                item.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        });
    };
    setupVideoHover();

    // ========== ART SHOWCASE HOVER EFFECTS ==========
    const artItems = document.querySelectorAll('.art-item');
    artItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // ========== TYPEWRITER EFFECT FOR HERO ==========
    const typeWriter = () => {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;
        
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typing = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    };
    
    // Wait 500ms after load to start typewriter
    setTimeout(typeWriter, 500);

    // ========== SOCIAL MEDIA LINK EFFECTS ==========
    const socialLinks = document.querySelectorAll('.social-links a, .social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });

    // ========== FORM VALIDATION ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('form-message');
            formMessage.style.display = 'block';
            formMessage.textContent = 'Sending your message...';
            formMessage.style.backgroundColor = 'var(--primary-color)';
            formMessage.style.color = 'white';
            
            // Simulate form submission
            setTimeout(() => {
                formMessage.textContent = 'Thank you! Your message has been sent. Quenlin will get back to you soon.';
                formMessage.style.backgroundColor = 'var(--secondary-color)';
                this.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // ========== PARALLAX EFFECT FOR HERO ==========
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Video Play/Pause Toggle
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.video-container video');
    const playBtn = document.querySelector('.play-btn');
    
    if (videoContainer && video && playBtn) {
        playBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
    
    // Product Color Switcher
    const colorOptions = document.querySelectorAll('.color-options .color');
    colorOptions.forEach(color => {
        color.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productType = productCard.dataset.product;
            const colorSelected = this.dataset.color;
            
            // Remove active class from all colors in this group
            productCard.querySelectorAll('.color').forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active class to selected color
            this.classList.add('active');
            
            // Change product image (in a real implementation, you would swap the image source)
            const productImage = productCard.querySelector('.product-image img');
            productImage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                productImage.style.transform = 'scale(1)';
            }, 300);
            
            console.log(`Selected ${colorSelected} color for ${productType}`);
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.live-main, .product-card, .live-banner');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    };
    
    animateOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // POP-UP SYSTEM
  // ======================
  const popup = document.getElementById('youtubePopup');
  const closeBtn = document.querySelector('.close-popup');
  const notInterestedBtn = document.querySelector('.not-interested');
  const subscribeBtn = document.getElementById('subscribeBtn');
  
  // Show popup initially after 2 seconds
  setTimeout(showPopup, 2000);
  
  // Track if user clicked "Not interested"
  let dismissedTemporarily = false;
  let popupInterval;
  
  function showPopup() {
    // Only show if not subscribed and not recently dismissed
    if (!getCookie('yt_subscribed') && !dismissedTemporarily) {
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Set up recurring popup every 10s if not subscribed
      clearInterval(popupInterval); // Clear any existing interval
      popupInterval = setInterval(() => {
        if (!getCookie('yt_subscribed') && !dismissedTemporarily) {
          popup.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        } else {
          clearInterval(popupInterval);
        }
      }, 10000);
    }
  }
  
  function hidePopup() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  // Event listeners
  closeBtn.addEventListener('click', hidePopup);
  
  notInterestedBtn.addEventListener('click', function() {
    hidePopup();
    dismissedTemporarily = true;
    
    // Show again after 10 seconds
    setTimeout(() => {
      dismissedTemporarily = false;
      showPopup();
    }, 10000);
  });
  
  subscribeBtn.addEventListener('click', function() {
    setCookie('yt_subscribed', 'true', 30);
    hidePopup();
    clearInterval(popupInterval);
  });

  // ======================
  // LA VIEWER TRACKING
  // ======================
  function getLAViewers() {
    try {
      return JSON.parse(localStorage.getItem('laViewers')) || [];
    } catch (e) {
      console.error('Error reading LA viewers data:', e);
      return [];
    }
  }

  function isLosAngelesVisitor() {
    try {
      // Modern browser method
      if (Intl && Intl.DateTimeFormat) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return timezone.includes('Los_Angeles') || 
               timezone === 'America/Los_Angeles' ||
               timezone.includes('Pacific');
      }
      
      // Fallback for older browsers
      const offset = new Date().getTimezoneOffset();
      // PST is UTC-8 (480) and PDT is UTC-7 (420)
      return offset === 420 || offset === 480;
    } catch (e) {
      console.error('Timezone detection failed:', e);
      return false;
    }
  }

  // Track LA viewer if detected
  if (isLosAngelesVisitor()) {
    try {
      const laViewers = getLAViewers();
      const sessionId = 'visitor_' + Date.now();
      
      if (!laViewers.includes(sessionId)) {
        laViewers.push(sessionId);
        localStorage.setItem('laViewers', JSON.stringify(laViewers));
      }
    } catch (e) {
      console.error('Failed to track LA visitor:', e);
    }
}})