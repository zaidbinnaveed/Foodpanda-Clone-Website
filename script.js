document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
        
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    const searchInput = document.querySelector('.search input');
    
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.transform = 'scale(1.05)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.transform = 'scale(1)';
    });
    
    searchInput.addEventListener('keyup', debounce(function(e) {
        if (e.target.value.length > 2) {
            showSearchSuggestions(e.target.value);
        } else {
            hideSearchSuggestions();
        }
    }, 300));
    
    const navLinks = document.querySelectorAll('header ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const footer = document.querySelector('footer');
    footer.style.opacity = 0;
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'all 0.5s ease-in-out';
    observer.observe(footer);
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('main');
        const rate = scrolled * -0.5;
        
        parallaxElement.style.backgroundPosition = `center ${rate}px`;
    });
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showSearchSuggestions(query) {
    console.log('Fetching suggestions for:', query);
}

function hideSearchSuggestions() {
    console.log('Hiding search suggestions');
}

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
        }
    });
});
