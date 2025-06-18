$(document).ready(function(){
    // Sticky navbar
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass('sticky');
        } 
        else{
            $('.navbar').removeClass('sticky');
        }
    });

    // Mobile menu toggle
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Smooth scrolling for navigation links
    $('.navbar .menu li a').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        const offsetTop = $(target).offset().top - 80;
        
        $('html, body').animate({
            scrollTop: offsetTop
        }, 800);
        
        // Close mobile menu after clicking a link
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
    });

    // Visitor counter functionality
    function updateVisitorCount() {
        // Get current date
        const today = new Date().toDateString();
        
        // Get stored visitor data
        let visitorData = JSON.parse(localStorage.getItem('visitorData')) || {};
        
        // Initialize today's count if it doesn't exist
        if (!visitorData[today]) {
            visitorData[today] = 0;
        }
        
        // Increment visitor count
        visitorData[today]++;
        
        // Store updated data
        localStorage.setItem('visitorData', JSON.stringify(visitorData));
        
        // Update display
        $('#visitor-count').text(visitorData[today]);
        
        // Animate the counter
        animateCounter(visitorData[today]);
    }

    function animateCounter(finalValue) {
        let currentValue = 0;
        const increment = finalValue / 50; // Divide animation into 50 steps
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            $('#visitor-count').text(Math.floor(currentValue));
        }, 20);
    }

    // Initialize visitor counter
    updateVisitorCount();

    // Add typing effect to the welcome text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.html('');
        
        function type() {
            if (i < text.length) {
                element.html(element.html() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect when page loads
    setTimeout(() => {
        typeWriter($('.home-content .text-1'), 'Welcome');
    }, 500);

    // Add hover effects to contact items
    $('.contact-item').hover(
        function() {
            $(this).find('i').css('transform', 'scale(1.2)');
        },
        function() {
            $(this).find('i').css('transform', 'scale(1)');
        }
    );

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Add scroll to top functionality
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });

    // Create scroll to top button
    $('body').append('<div class="scroll-top"><i class="fas fa-arrow-up"></i></div>');
    
    $('.scroll-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
    });
});

// Add CSS for scroll to top button
const scrollTopCSS = `
<style>
.scroll-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: crimson;
    color: white;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.scroll-top:hover {
    background: #a52a2a;
    transform: translateY(-3px);
}

.scroll-top i {
    font-size: 20px;
}

body.loaded {
    opacity: 1;
}

body {
    opacity: 0;
    transition: opacity 0.5s ease;
}
</style>
`;

// Inject CSS
$('head').append(scrollTopCSS);