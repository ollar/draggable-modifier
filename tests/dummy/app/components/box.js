import Component from '@glimmer/component';

export default class BoxComponent extends Component {
    handlePanMove(ev, cb) {
        return cb(ev);
    }
}
