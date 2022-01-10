import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';
import {
  DIRECTION_ALL,
  DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL,
} from 'draggable-modifier';

export default class ApplicationController extends Controller {
  DIRECTION_ALL = DIRECTION_ALL;
  DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  DIRECTION_VERTICAL = DIRECTION_VERTICAL;

  get code1() {
    return htmlSafe(`
        <div class="box" {{draggable panDirection=this.DIRECTION_HORIZONTAL}}>
          horizontal
        </div>`);
  }

  get code2() {
    return htmlSafe(`
        <div class="box" {{draggable panDirection=this.DIRECTION_VERTICAL}}>
          vertical
        </div>`);
  }

  get code3() {
    return htmlSafe(`
        <div class="box" {{draggable panDirection=this.DIRECTION_ALL}}>
          all
        </div>`);
  }
}
