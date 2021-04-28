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