var menuTrigger = document.querySelector("[data-trigger='menu']");
var close = document.querySelector("[data-trigger='close-menu']");
var contact = document.querySelector(".content-menu [href='#contact']");

menuTrigger.addEventListener('click', () => {
    // console.log('menu triggered successfully!');
    let tl = gsap.timeline();
    tl.fromTo('#menu', {display: 'none'}, {display: 'unset'})
    .fromTo('.content-menu', {x: '100%', duration: 0.5}, {x: 0}, '-=0.5')
});

close.addEventListener('click', closeMenu); 
contact.addEventListener('click', closeMenu); 

function closeMenu(){
    // console.log('close triggered successfully!');
    let tl = gsap.timeline();
    tl.fromTo('.content-menu', {x: 0, duration: 0.5}, {x: '100%'})
    .fromTo('#menu', {display: 'unset'}, {display: 'none'}, '-=0.5')
}