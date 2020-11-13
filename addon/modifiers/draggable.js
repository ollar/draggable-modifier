import Modifier from 'ember-modifier';
import { htmlSafe } from '@ember/string';

import Hammer from 'hammerjs';

const { DIRECTION_ALL, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } = Hammer;


const defaultConfigs = {
    panDirection: DIRECTION_ALL,
    maxDistance: 1000,
};


export default class DraggableModifier extends Modifier {
    cachedStyle = htmlSafe('');
    initialTransform = [0, 0];

    calcDelta(delta) {
        return Math.sign(delta) * Math.min(Math.abs(delta), this.maxDistance);
    }

    constructor(modifier, { named }) {
        super(...arguments);

        this.panDirection = named.panDirection || defaultConfigs.panDirection;
        this.maxDistance = named.maxDistance || defaultConfigs.maxDistance;

        const handlePanStart = this.handlePanStart.bind(this);
        const handlePanMove = this.handlePanMove.bind(this);
        const handlePanEnd = this.handlePanEnd.bind(this);
        const onPanEnvComplete = this.onPanEnvComplete.bind(this);

        this.handlePanStart =
            named.handlePanStart ?
            e => named.handlePanStart(e, handlePanStart) :
            handlePanStart;

        this.handlePanMove =
            named.handlePanMove ?
            e => named.handlePanMove(e, handlePanMove) :
            handlePanMove;

        this.handlePanEnd =
            named.handlePanEnd ?
            e => named.handlePanEnd(e, handlePanEnd) :
            handlePanEnd;

        this.onPanEnvComplete =
            named.onPanEnvComplete ?
            e => named.onPanEnvComplete(e, onPanEnvComplete) :
            onPanEnvComplete;
    }

    onPanEnvComplete() {
        this.element.style = htmlSafe(`${this.cachedStyle}`);
    }

    // @action
    handlePanStart(ev) {
        ev.preventDefault();

        this.element.classList.add('is-dragged');

        const { transform } = window.getComputedStyle(this.element);

        if (transform === 'none') {
            this.initialTransform = [0, 0];
        } else {
            this.initialTransform =
                transform
                    .replace(/[a-z()]/g, '')
                    .split(', ')
                    .slice(-2)
                    .map(i => Number(i));
        }

        this.previousMoveX = this.initialTransform[0];
        this.previousMoveY = this.initialTransform[1];
    }

    handlePanMove(ev) {
        ev.preventDefault();

        const _beforeMove = this.args.named._beforeMove;
        const _afterMove = this.args.named._afterMove;

        _beforeMove && _beforeMove.call && _beforeMove(ev);

        const moveX = () =>
            (ev.direction & this.panDirection) === ev.direction
                ? this.initialTransform[0] + this.calcDelta(ev.deltaX)
                : this.previousMoveX;
        const moveY = () =>
            (ev.direction & this.panDirection) === ev.direction
                ? this.initialTransform[1] + this.calcDelta(ev.deltaY)
                : this.previousMoveY;

        const allowedHorizontal =
            (this.panDirection | DIRECTION_HORIZONTAL) === this.panDirection;
        const allowedVertical =
            (this.panDirection | DIRECTION_VERTICAL) === this.panDirection;

        requestAnimationFrame(() => {
            this.element.style =
                htmlSafe(
                    `${this.cachedStyle};
                    transform: translate(
                        ${allowedHorizontal ? moveX() : this.previousMoveX}px,
                        ${allowedVertical ? moveY() : this.previousMoveY}px
                    )`
                );

            if (allowedHorizontal) this.previousMoveX = moveX();
            if (allowedVertical) this.previousMoveY = moveY();

            _afterMove && _afterMove.call && _afterMove(ev);
        });
    }

    handlePanEnd(ev) {
        this.element.classList.remove('is-dragged');

        ev.preventDefault();
        ev.srcEvent.stopPropagation();

        this.onPanEnvComplete(ev);
    }

    addEventListener() {
        this.hammerManager = new Hammer.Manager(this.element);

        this.hammerManager.add(
            new Hammer.Pan({
                direction: this.panDirection,
            })
        );

        this.cachedStyle = this.element.getAttribute('style');

        this.hammerManager.on('panstart', this.handlePanStart);
        this.hammerManager.on('panend', this.handlePanEnd);
        this.hammerManager.on('panmove', this.handlePanMove);
        this.hammerManager.on('pancancel', this.handlePanEnd);
    }

    removeEventListener() {
        if (this.hammerManager) this.hammerManager.destroy();
    }

    // lifecycle hooks
    didReceiveArguments() {
        this.removeEventListener();
        this.addEventListener();
    }

    willRemove() {
        this.removeEventListener();
    }
}
