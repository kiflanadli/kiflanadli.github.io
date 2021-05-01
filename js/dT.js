gsap.to('a.home-btn', {color: '#fff'});
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: 'div.bg-img',
        start: 'bottom top',
        end: 'bottom top',
        toggleActions: 'play none reset none'
    }
})
tl.to('a.home-btn', {color: '#000', duration: 0.5})