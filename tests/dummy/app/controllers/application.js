import Controller from '@ember/controller';
import { DIRECTION_ALL, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from 'draggable-modifier';

export default class ApplicationController extends Controller {
    DIRECTION_ALL = DIRECTION_ALL;
    DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
    DIRECTION_VERTICAL = DIRECTION_VERTICAL;
}
