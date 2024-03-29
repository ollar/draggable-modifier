draggable-modifier
==============================================================================

Modifier wrapper over Hammer.js library to drag elements


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install draggable-modifier
```


Usage
------------------------------------------------------------------------------

This is a rewrite of the draggable-mixin addon to modifier. A working example is in dummy app, just run `ember s` to see a basic representation.

```
<div class="box" {{draggable
                    panDirection=this.panDirection
                    maxDistance=1000
                    handlePanStart=this.handlePanStart
                    handlePanMove=this.handlePanMove
                    handlePanEnd=this.handlePanEnd
                    onPanEnvComplete=this.onPanEnvComplete
                    }}>
```

where `handlePanStart`, `handlePanMove`, `handlePanEnd`, `onPanEnvComplete` are optional function wrappers over modifier's ones. They get `event`, `cb` and `draggableInstance` as parameters eg:

```handlePanStart = (ev, handlePanStartFromDraggableCallback, draggableInstance) -> void 0```.

`maxDistance` - {number} dragging limit in px.

`panDirection` - {Hammer#directional_constants} DIRECTION_ALL, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL. Could be imported from this addon ```import { DIRECTION_HORIZONTAL } from 'draggable-modifier'```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
