window.aboutJs = (function () {
    // gsap.to('a.home-btn', {color: '#fff'});
    // let tl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: 'div.bg-img',
    //         start: 'bottom top',
    //         end: 'bottom top',
    //         toggleActions: 'play none reset none'
    //     }
    // })
    // tl.to('a.home-btn', {color: '#000', duration: 0.5})
    
            
    const skill = document.querySelectorAll('.progress');
    const logoAnim = gsap.timeline();
    
    skill.forEach(el => {
        gsap.from(el, {
            transformOrigin: 'left',
            scaleX: 0, 
            duration: 0.6, 
            scrollTrigger: {
                trigger: el
            }
        })
    })
    
    logoAnim.from('#about-top', {
        duration: 2.5,
        backgroundSize: '+=25%'
    }, '+=1')
    .from('.logo', {
        transformOrigin: 'center',
        rotation: 50,
        duration: 2.5,
        filter: "blur(30px)",
        opacity: 0
    }, '-=2.5')
    .from('.headline-page h1', {
        duration: 2.5,
        filter: "blur(30px)",
        opacity: 0
    }, '-=2.5')
    .from('span[data-trigger="scroll-down"]', {
        y: 250,
        duration: 0.7
    })
});
window.aboutJs();