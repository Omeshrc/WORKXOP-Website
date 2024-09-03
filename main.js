let lastScrollPos = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    // get the current scroll position from the top of the page
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > lastScrollPos) {
        // hide the header when scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // show the header when scrolling up
        header.style.transform = 'translateY(0)';
    }

    lastScrollPos = currentScrollPos;
});



const clickableDivs = document.querySelectorAll('.clickable-div');

clickableDivs.forEach((div) => {
  div.addEventListener('click', function() {
    // get the utl from the data-url
    const url = this.getAttribute('data-url');
    
    // navigate to the url
    window.location.href = url;
  });
});


function constructEmailBody(event) {
    event.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked').value;
    const reason = document.getElementById('reason').value;
    const reccomend = document.querySelector('input[name="reccomend"]:checked').value;
    const visit = document.getElementById('visit').value;
    const preference = document.getElementById('preference').value;

    const emailBody = `Rating: ${rating}\nReason: ${reason}\nRecommendation: ${reccomend}\nWebsite visit: ${visit}\nPreference: ${preference}\n`;

    const form = document.querySelector('form');
    form.action = `mailto:minoshanj@gmail.com?subject=User%20Details&body=${encodeURIComponent(emailBody)}`;

    // call the openPopup
    openPopup();

    form.submit();
}


let popup = document.getElementById("popup");
let overlay = document.getElementById("overlay");

function openPopup() {
    popup.classList.add("open-popup");
    overlay.style.visibility = "visible";
}

function closePopup() {
    popup.classList.remove("open-popup");
    overlay.style.visibility = "hidden";
}


function validateForm(event) {
    event.preventDefault();

    // reset any previous error messages
    document.getElementById("ratingError").style.display = "none";
    document.getElementById("reccomendError").style.display = "none";
    document.getElementById("reasonError").style.display = "none";


    const rating = document.querySelector('input[name="rating"]:checked');
    if (!rating) {
        document.getElementById("ratingError").style.display = "flex";
        document.getElementById("commentForm").scrollIntoView({ behavior: "smooth" });
        return;
    }


    const reason = document.getElementById("reason").value.trim();
    if (reason === "") {
        document.getElementById("reasonError").style.display = "flex";
        document.getElementById("commentForm").scrollIntoView({ behavior: "smooth" });
        return;
    }

    const reccomend = document.querySelector('input[name="reccomend"]:checked');
    if (!reccomend) {
        document.getElementById("reccomendError").style.display = "flex";
        document.getElementById("reason").scrollIntoView({ behavior: "smooth" });
        return;
    }

    // if all passes, submit the form
    constructEmailBody(event)
}

function scrollToTop() {
    // scrolls the page to top
    window.scrollTo(250, 250);
}

const links = document.querySelectorAll('.side-navbar a');

        function setActiveLink() {
            const currentLink = window.location.hash;
            links.forEach(link => {
                if (link.getAttribute('href') === currentLink) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        setActiveLink();

        links.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(setActiveLink, 10); // delay the update to make sure the hash changes
            });
        });