// Smooth scroll functionality for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Contact Form Functionality using EmailJS
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS with your public key
  emailjs.init('G9ATQzApG2rzgU8lX'); // Replace with your actual EmailJS public key

  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoading = document.getElementById('btnLoading');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show loading state
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';

      // Get form data
      const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      // Send email using EmailJS
      emailjs.send('service_ip68u4m', 'template_unbwfhe', formData) // Replace with your actual service and template IDs
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);

          // Show success message
          formMessage.style.display = 'block';
          formMessage.className = 'form-message success';
          formMessage.textContent = 'Thank you! Your message has been sent successfully.';

          // Reset form
          contactForm.reset();

          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);

        }, function(error) {
          console.log('FAILED...', error);

          // Show error message
          formMessage.style.display = 'block';
          formMessage.className = 'form-message error';
          formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly at subashinisrikanthan@gmail.com';

          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        })
        .finally(function() {
          // Reset button state
          submitBtn.disabled = false;
          btnText.style.display = 'inline';
          btnLoading.style.display = 'none';
        });
    });
  }
});
