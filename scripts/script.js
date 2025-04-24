// Style switcher functionality
document.getElementById('style-switcher').addEventListener('click', function() {
    // Get the stylesheet element
    const stylesheet = document.getElementById('stylesheet');
    
    // Extract the current stylesheet filename from the href
    const currentHref = stylesheet.getAttribute('href');
    const currentStyle = currentHref.split('/').pop();
    
    // Define available styles
    const styles = ['style1.css', 'style2.css', 'style3.css'];
    
    // Find current index and calculate next index
    const currentIndex = styles.indexOf(currentStyle);
    const nextIndex = (currentIndex + 1) % styles.length;
    
    // Set the new stylesheet
    stylesheet.href = 'styles/' + styles[nextIndex];
    
    // Save preference to localStorage
    localStorage.setItem('preferredStyle', styles[nextIndex]);
    
    // Add visual feedback for style change
    document.body.classList.add('style-transition');
    setTimeout(() => {
        document.body.classList.remove('style-transition');
    }, 500);
});

// Theme toggle functionality (dark/light mode)
document.getElementById('theme-toggle').addEventListener('click', function() {
    // Toggle dark theme class on body
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference to localStorage
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    
    // Update button appearance based on theme
    updateThemeToggleButton();
    
    // Add visual feedback for theme change
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
});

// Function to update theme toggle button appearance
function updateThemeToggleButton() {
    const themeToggle = document.getElementById('theme-toggle');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    if (isDarkTheme) {
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        themeToggle.classList.add('dark-active');
        themeToggle.classList.remove('light-active');
    } else {
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        themeToggle.classList.add('light-active');
        themeToggle.classList.remove('dark-active');
    }
}

// Function to set active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    // Get current scroll position
    const scrollPosition = window.scrollY + 100; // Offset for better UX
    
    // Find the current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load saved style preference
    const savedStyle = localStorage.getItem('preferredStyle');
    if (savedStyle && ['style1.css', 'style2.css', 'style3.css'].includes(savedStyle)) {
        document.getElementById('stylesheet').href = 'styles/' + savedStyle;
    }
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    // Update theme toggle button appearance
    updateThemeToggleButton();
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Set initial active navigation link
    updateActiveNavLink();
    
    // Add form submission handler if contact form exists
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});

// Update active navigation link on scroll
window.addEventListener('scroll', function() {
    updateActiveNavLink();
});

// Add resize event listener for responsive adjustments
window.addEventListener('resize', function() {
    // Any responsive adjustments can go here
});

// Optional: Add a "back to top" button functionality
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
});

// Optional: Initialize any third-party libraries or components
function initializeComponents() {
    // Any component initialization can go here
}

// Call initialization function
initializeComponents();