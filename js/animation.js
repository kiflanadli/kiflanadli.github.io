var scrollAnim = function (params) {
    var main = document.getElementById(params.mainTrigger);
    var defaults = {
        trigger: main,
        start: params.start || 'top bottom',
        end: params.end || 'bottom top',
        toggleActions: params.action || 'play reset play reset',
    };
    ScrollTrigger.defaults(defaults);
}

// cover page
function removeCover() {
    const cover = document.querySelector('.cover');
    return gsap.timeline().to(cover, 
        {
            transformOrigin: 'center top',
            scaleY: 0,
            ease: 'Power4.inOut',
            duration: 0.7
        })
        .to(cover,
            {
                display: 'none',
                duration: 0.1
            }
        )
}

// page transitions

function init(){
    
    const loader = document.querySelector('.loader');

    // reset position of the loading screen
    gsap.set(loader, {
        scaleX: 0, 
        rotation: 10, 
        xPercent: -5,
        yPercent: -50, 
        transformOrigin: 'left center', 
        autoAlpha: 1

        // autoAlpha: 0,
        // scaleY: 1,
        // transformOrigin: 'center top',
        // backgroundColor: 'rgba(255, 246, 237, 0)'
    });

    function loaderIn() {
        // GSAP tween to stretch the loading screen across the whole screen
        return gsap.fromTo(loader, 
            {
                rotation: 10,
                scaleX: 0,
                xPercent: -5

                // scaleY: 1,
                // autoAlpha: 0,
                // backgroundColor: 'rgba(255, 246, 237, 0)'                
            },
            { 
                duration: 1,
                xPercent: 0,
                scaleX: 1, 
                rotation: 0,
                ease: 'power2.inOut', 
                transformOrigin: 'left center'

                // duration: 1,
                // autoAlpha: 1,
                // ease: 'Power4.inOut', 
                // backgroundColor: 'rgba(255, 246, 237, 1)'                
            });
    }

    function loaderAway() {
        // GSAP tween to hide the loading screen
        return gsap.to(loader, { 
            duration: 1.5, 
            scaleX: 0,
            xPercent: 5, 
            rotation: -10, 
            transformOrigin: 'right center', 
            ease: 'power2.inOut'

            // duration: 1,
            // ease: 'Power4.inOut', 
            // scaleY: 0
        });
    }

    function homeAway() {
        // initiate parent element
        let body = document.getElementsByTagName('body')[0];

        // remove home attr
        let script = document.getElementById("fullpageScroll");
        let scriptTrigger = document.getElementById("fullpageTrigger");
        let form = document.getElementById("scriptForm");
        let ul = document.getElementsByClassName("dots");
        let link = document.querySelectorAll("link[href='../css/full-page-scroll.css']");
        if (script || scriptTrigger || ul || link || form) {
            script.parentNode.removeChild(script);
            scriptTrigger.parentNode.removeChild(scriptTrigger);
            form.parentNode.removeChild(form);
            ul[0].parentNode.removeChild(ul[0]);
            link[0].parentNode.removeChild(link[0]);    
        }
        
        // create noneJs
        let theScript = document.createElement('script');
        theScript.setAttribute('id', "noneJs");
        theScript.setAttribute('src', "../js/none.js");
        theScript.setAttribute('type', "text/javascript");
        body.appendChild( theScript );

        // add header-content class
        let title = document.querySelectorAll('a.home-btn');
        title[0].classList.add('header-content');

        // let go = gsap.timeline();
        // go.to('a.home-btn', {color: '#fff'})
        // go.to('html', {overflow: "auto", height: "auto", duration: 0.1})
        // .to('body', {overflow: "auto", height: "auto", duration: 0.1}, '-=0.1')
        // go.to('ul.dots', {display: 'none', duration: 0.1}, '-=0.1')
        // .to('footer.main-footer', {display: 'none', duration: 0.1}, '-=0.2')
        
    }

    function homeEnter() {
        // initiate parent element
        let head = document.getElementsByTagName('head')[0];
        let body = document.getElementsByTagName('body')[0];

        // remove noneJs if there is
        let script = document.getElementById("noneJs");
        if (script) {
            script.parentNode.removeChild(script);
        }

        // create fullpage css
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../css/full-page-scroll.css');
        head.appendChild(link);

        // create fullpageScroll and fullpageTrigger js
        
        let checkScript = document.getElementById("fullpageScroll");
        if (!checkScript) {
            let createFPS = new Promise(function(success, error) {
                let theScript = document.createElement('script');
                theScript.setAttribute('id', "fullpageScroll");
                theScript.setAttribute('src', "../js/full-page-scroll.js");
                theScript.setAttribute('type', "text/javascript");
                setTimeout(() => {
                    success(body.appendChild( theScript ));
                }, 10);
            }); 

            function createFPT() {
                let theScript2 = document.createElement('script');
                theScript2.setAttribute('id', "fullpageTrigger");
                theScript2.setAttribute('src', "../js/full-page-trigger.js");
                theScript2.setAttribute('type', "text/javascript");
                let ss = document.getElementById('fullpageScroll');
                if (ss) {
                    console.log('fullpageScroll loaded');
                    body.appendChild( theScript2 );
                } else {
                    location.reload();
                }
            }

            createFPS.then(createFPT);
        }
        

        // create form to google using ajax
        let scriptForm = document.createElement('script');
        // scriptForm.setAttribute('data-cfasync', 'false');
        scriptForm.setAttribute('type', 'text/javascript');
        scriptForm.setAttribute('id', 'scriptForm');
        scriptForm.setAttribute('src', '../js/form-submission-handler.js');
        body.appendChild( scriptForm );

        // remove header-content class
        let title = document.querySelectorAll('a.home-btn');
        title[0].classList.remove('header-content');

        // let go = gsap.timeline();
        // go.to('html', {overflow: "hidden", height: "100%", duration: 0.1})
        // .to('body', {overflow: "hidden", height: "100%", duration: 0.1}, '-=0.1')
        // // .to('ul.dots', {display: 'none', duration: 0.1}, '-=0.1')
        // .to('footer.main-footer', {display: 'unset', duration: 0.1}, '-=0.2')
        // go.to('a.home-btn', {color: '#000'})
        
    }
    
    function aboutEnter() {
        let head = document.getElementsByTagName('head')[0];
        let body = document.getElementsByTagName('body')[0];

        // // let go = gsap.timeline();
        // // go.to('a.home-btn', {color: '#fff'})
        // let tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: 'div.bg-img',
        //         start: 'bottom top',
        //         end: 'bottom top',
        //         toggleActions: 'play none reset none'
        //     }
        // })
        // tl.to('a.home-btn', {color: '#000', duration: 0.5})
        let dT = document.getElementById('dT');
        if (!dT) {
            let dTscript = document.createElement('script');
            dTscript.setAttribute('id', "dT");
            dTscript.setAttribute('src', "../js/dT.js");
            dTscript.setAttribute('type', "text/javascript");
            body.appendChild( dTscript );
        }
    }

    function aboutLeave() {
        let removeDT = document.getElementById("dT");
        if (removeDT) {
            removeDT.parentNode.removeChild(removeDT);
        }
    }

    // function aboutEnter() {
    //     let go = gsap.timeline();
    //     go.to('a.home-btn', {color: 'white'})
    // }

    // do something before the transition starts
    barba.hooks.before(() => {

        document.querySelector('html').classList.add('is-transitioning');
        barba.wrapper.classList.add('is-animating');

    });

    // do something after the transition finishes
    barba.hooks.after(() => {

        document.querySelector('html').classList.remove('is-transitioning');
        barba.wrapper.classList.remove('is-animating');

    });


    barba.init({
        transitions: [{
            async leave() {
                await loaderIn();
        
            },
            enter() {
                setTimeout(() => {
                    loaderAway();
                }, 200);
                    
            },
            before() {
                // scroll to the top of the page
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }],
        views: [{
            namespace: 'home',
            afterLeave() {
                homeAway();
            },
            beforeEnter() {
                homeEnter();
            }
        }, {
            namespace: 'about',
            beforeEnter() {
                aboutEnter();
            },
            beforeLeave() {
                aboutLeave();
            }
        }]
    })

}

window.addEventListener('load', function() {
    setTimeout(removeCover, 1000);
    init();
});