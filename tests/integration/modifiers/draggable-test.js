import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Touchemulator from 'hammer-touchemulator';


module('Integration | Modifier | draggable', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<div {{draggable}}>draggable</div>`);

    assert.ok(true, 'smoke test');
  });

  test('it accepts mouse events', async function (assert) {
    await render(hbs`<div data-test-element {{draggable}}>draggable</div>`);

    Touchemulator();

    const element = await find('[data-test-element]');

    const {x, y} = element.getBoundingClientRect();

    await triggerEvent( element, 'mousedown', { clientX: x, clientY: y })
    for (let i = 0; i < 100; i++) {
      await triggerEvent( element, 'mousemove', { clientX: x + i, clientY: y + i })
    }
    await triggerEvent( element, 'mouseup', { clientX: x+ 99, clientY: y+99 })

    assert.ok(element);
  });
});
