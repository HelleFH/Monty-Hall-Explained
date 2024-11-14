document.addEventListener("DOMContentLoaded", function() {
    const quotes1 = [
        { text: "You made a mistake, but look at the positive side. If all those Ph.D.'s were wrong, the country would be in serious trouble.", author: "Dr. E. Ray Bobo, Georgetown University" },
        { text: "May I suggest that you obtain and refer to a standard textbook on probability before you try to answer a question of this type again?", author: "Charles Reid, Ph.D., University of Florida" },
        { text: "How many irate mathematicians are needed to change your mind?", author: "E. Ray Bobo, Ph.D., University of Texas" },
        { text: "If you publish this, you will have a thousand Ph.D.'s writing in to tell you that you are wrong.", author: "Don Edwards, Ph.D., University of Georgia" },
        { text: "I'm very concerned with the general public’s lack of mathematical skills. Please help by confessing your error and in the future being more careful.", author: "Charles Reid, Ph.D., University of Florida" },
        { text: "You are the goat! You made a mistake, but look at the positive side. If all those Ph.D.'s were wrong, the country would be in serious trouble.", author: "Dr. George Kolata, Department of Mathematics, Oberlin College" },
        { text: "I am in shock that after being corrected by at least three mathematicians, you still do not see your mistake.", author: "Kent Ford, Ph.D., Dickinson State University" },
        { text: "You are utterly incorrect. How many irate mathematicians are needed to change your mind?", author: "Barry Pasternack, Ph.D., California State University" },
        { text: "Your answer to the Monty Hall problem is in error and is a clear illustration of the dangers of knowledge without understanding.", author: "B.A. Nelson, Ph.D., Morgan State University" },
        { text: "If all those Ph.D.'s were wrong, the country would be in serious trouble. You blew it, and you blew it big!", author: "S. Schlain, Ph.D., Wayne State University" }
    ];

    const quotes2 = [
        { text: "After careful consideration and multiple simulations, it’s clear that switching doors is the better option.", author: "Robert Sachs, Ph.D., George Mason University" },
        { text: "You are indeed correct. After performing numerous simulations, I can confirm that switching doors increases the odds of winning to 2/3.", author: "Lawrence S. Brash, Ph.D., University of Southern California" },
        { text: "I apologize for my initial criticism. Your logic and explanation are sound. Switching doors is the better strategy.", author: "Earl D. Sacerdote, Ph.D., Mathematics Professor, Massachusetts Institute of Technology" },
        { text: "My students and I conducted the Monty Hall experiment, and the results consistently showed that switching is indeed the best strategy.", author: "George Brant, Mathematics Instructor, Boston University" },
        { text: "I ran computer simulations and found that the probability of winning when switching is indeed 2/3.", author: "David H. Ropeik, Consultant, Risk Perception and Communication" },
        { text: "Having reconsidered my initial reaction, I now see that your explanation is mathematically accurate. I apologize for my earlier comments.", author: "Robert W. Tufts, Ph.D., Professor of Mathematics, Columbia University" },
        { text: "You have done a great service by clarifying this counterintuitive problem for the general public.", author: "John M. Obrien, Professor of Statistics, University of Chicago" }
    ];
    
    function showQuotes(quotes, containerId) {
        const quoteContainer = document.getElementById(containerId);
        let currentQuoteIndex = 0;
        let currentZIndex = 1;

        function isMobile() {
            return window.innerWidth <= 768; // Mobile breakpoint
        }

        function isTablet() {
            return window.innerWidth <= 1000 && window.innerWidth > 768; // Tablet breakpoint
        }

        function showNextQuote() {
            if (currentQuoteIndex < quotes.length) {
                const quoteElement = document.createElement("div");
                quoteElement.classList.add("quote");

                let topPosition, leftPosition;
                if (isMobile()) {
                    topPosition = getRandomNumber(0, quoteContainer.clientHeight - 200);
                    leftPosition = getRandomNumber(0, quoteContainer.clientWidth - 100);
                } else if (isTablet()) {
                    topPosition = getRandomNumber(0, quoteContainer.clientHeight - 300);
                    leftPosition = getRandomNumber(0, quoteContainer.clientWidth - 400);
                } else {
                    topPosition = getRandomNumber(0, quoteContainer.clientHeight - 400);
                    leftPosition = getRandomNumber(0, quoteContainer.clientWidth - 800);
                }

                quoteElement.style.top = `${topPosition}px`;
                quoteElement.style.left = `${leftPosition}px`;
                quoteElement.style.zIndex = currentZIndex++;
                quoteElement.innerHTML = `
                    <div class="quote-overlay"></div>
                    <div class="blockquote">"${quotes[currentQuoteIndex].text}"</div>
                    <div class="cite">${quotes[currentQuoteIndex].author}</div>
                `;
                quoteContainer.appendChild(quoteElement);

                gsap.to(quoteElement, {opacity: 1, y: 0, duration: 1, delay: currentQuoteIndex * 0.5});
                currentQuoteIndex++;
            }
        }

        gsap.to(window, {
            scrollTrigger: {
                trigger: `#${containerId}`,
                start: "top center",
                onEnter: () => {
                    showNextQuote();
                    for (let i = 1; i < quotes.length; i++) {
                        setTimeout(showNextQuote, i * 2000);
                    }
                }
            }
        });

        function getRandomNumber(min, max) {
            return Math.random() * (max - min) + min;
        }
    }
showQuotes(quotes1, "quote-container-1");
    showQuotes(quotes2, "quote-container-2");
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".revealUp").forEach(function (elem) {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 80%",
        end: "bottom 20%",
        markers: false,
        onEnter: function () {
            // Check if it's a mobile or tablet screen
            const isMobile = window.innerWidth <= 768; // Adjust the max width as needed
            const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024; // Optional: for tablets

            // Adjust animation duration based on screen size
            const duration = isMobile ? 0.8 : 1.25; // Faster animation on mobile

            gsap.fromTo(
                elem,
                { y: 100, autoAlpha: 0 },
                {
                    duration: duration,  // Dynamic duration based on screen size
                    y: 0,
                    autoAlpha: 1,
                    ease: "back",
                    overwrite: "auto"
                }
            );
        }
    });
});
