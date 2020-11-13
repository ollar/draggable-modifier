import Component from '@glimmer/component';

export default class BoxComponent extends Component {
    handlePanMove(ev, cb) {
        console.log(ev);

        return cb(ev);
    }
}
