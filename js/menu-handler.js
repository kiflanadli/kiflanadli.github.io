var menuTrigger = document.querySelector("[data-trigger='menu']");
var close = document.querySelector("[data-trigger='close-menu']");
var link = document.querySelectorAll(".content-menu a");

menuTrigger.addEventListener('click', () => {
    // console.log('menu triggered successfully!');
    let tl = gsap.timeline();
    tl.fromTo('#menu', {display: 'none'}, {display: 'unset'})
    .fromTo('#menu', {backgroundColor: 'rgba(37, 41, 52, 0)', duration: 0.5}, {backgroundColor: 'rgba(37, 41, 52, 0.5)'}, '-=0.5')
    .fromTo('.content-menu', {x: '100%', duration: 0.5}, {x: 0}, '-=0.5')
    .from('.content-menu', {width: '10%', duration: 0.5, ease: "back.out(1.4)"}, '-=0.5')
});

close.addEventListener('click', closeMenu); 
for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('click', closeMenu); 
}

function closeMenu(){
    // console.log('close triggered successfully!');
    let tl = gsap.timeline();
    tl.fromTo('.content-menu', {x: 0, duration: 0.5}, {x: '100%'})
    .fromTo('#menu', {display: 'unset'}, {display: 'none'}, '-=0.5')
    .to('#menu', {backgroundColor: 'rgba(37, 41, 52, 0)', duration: 0.5}, '-=0.5')
}