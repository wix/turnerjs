define(['animations/localTweenEngine/localTweenEngine'], function(tweenEngine) {
    'use strict';

    /** core.animations.tweenEngineGreenSock */
    var engine = tweenEngine.engine;
    /** core.animationsFactory */
    var factory = tweenEngine.factory;

    /**
     * Skew animation object
     * @param {Array<HTMLElement>|HTMLElement} elements DOM elements
     * @param {Number} [duration=1.0]
     * @param {Number} [delay=0]
     * @param {Object} params
     * @param {Number|String} [params.from.skewX]
     * @param {Number|String} [params.from.skewY]
     * @param {Number|String} [params.to.skewX]
     * @param {Number|String} [params.to.skewY]
     * @returns {TweenMax}
     */
    function baseSkew(elements, duration, delay, params) {

        params.duration = duration || 0;
        params.delay = delay || 0;

        return engine.tween(elements, params, ['skewX', 'skewY']);
    }

    factory.registerAnimation('BaseSkew', baseSkew);
});