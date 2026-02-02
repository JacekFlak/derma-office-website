const menuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    const exp = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', exp);
});

const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    
    if (scroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = scroll;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

const form = document.getElementById('newsletterForm');
const msg = document.getElementById('newsletterMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fd = new FormData(form);
    const data = {};
    fd.forEach((value, key) => {
        data[key] = value;
    });
    
    if (!data.name || !data.email) {
        showMsg('Proszę wypełnić wszystkie wymagane pola.', 'error');
        return;
    }
    
    if (!data.consent) {
        showMsg('Proszę wyrazić zgodę na otrzymywanie newslettera i przetwarzanie danych osobowych.', 'error');
        return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        showMsg('Proszę podać prawidłowy adres email.', 'error');
        return;
    }
    
    showMsg('Zapisywanie do newslettera...', 'success');
    
    setTimeout(() => {
        showMsg('Dziękujemy za zapis do newslettera! Będziemy wysyłać Ci najnowsze informacje.', 'success');
        form.reset();
        
        setTimeout(() => {
            msg.style.display = 'none';
        }, 5000);
    }, 1500);
});

function showMsg(message, type) {
    msg.textContent = message;
    msg.className = `form-message ${type}`;
    msg.style.display = 'block';
}

const opts = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, opts);

const els = document.querySelectorAll('.team-member, .service-card, .pricing-category, .info-card');
els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(el);
});

window.addEventListener('scroll', () => {
    let curr = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (pageYOffset >= (top - 150)) {
            curr = section.getAttribute('id');
        }
    });
    
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${curr}`) {
            link.classList.add('active');
        }
    });
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
