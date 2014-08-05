/*!
 *  command-palette.js
 */
var CP = CP || {};

(function(util) {
    'use strict';

    var constants = {
            commandHeight: 30,
            indexOfMiddleCommand: 5,
            pageHeight: 10
        },
        elements = {},
        isInitialised = false,
        model,
        view;

    /**
     * CommandPaletteModel for binding
     */
    function CommandPaletteModel() {
        var palette = this;

        palette.list = getCommandList();
        palette.filteredList = palette.list;
        palette.command  = '';
        palette.selected = 0;

        // Filter commands based on the typed keyword
        palette.filteredCommands = function() {
            var filter = palette.command;

            // If there is no word, show all commands
            if (!filter) {
                return palette.list;
            }
            // Filter the results
            else {
                palette.filteredList = palette.list.filter(function(item) {
                    return item.command.toLowerCase().indexOf(filter.toLowerCase()) > -1;
                });

                // Reset selected state
                palette.set(0);

                return palette.filteredList;
            }
        };

        // Set the command to a specific index
        palette.set = function(index) {
            // Reset selected states
            palette.list.map(function(element) {
                element.selected = false;
            });

            // Keep track of index
            palette.selected = index;

            // Select command for model
            if (palette.filteredList.length > 0) {
                palette.filteredList[index].selected = true;
            }

            elements.commandList.scrollTop = (index - constants.indexOfMiddleCommand) * constants.commandHeight;
        };

        palette.move = function(index) {
            palette.set(palette.selected + index);
        };

        // Move down on the list
        palette.moveDown = function() {
            // If the user is already on the bottom most command, go back to the top
            if (palette.selected === palette.filteredList.length - 1) {
                palette.set(0);
            } else {
                palette.move(1);
            }
        };

        // Move up on the list
        palette.moveUp = function() {
            // If the user is on the top most command, go to the bottom
            if (palette.selected === 0) {
                palette.set(palette.filteredList.length - 1);
            } else {
                palette.move(-1);
            }
        };

        // Move down on the list
        palette.movePageDown = function() {
            // If the user is already on the bottom most command, go back to the top
            if (palette.selected === palette.filteredList.length - 1) {
                palette.set(0);
            } else if (palette.selected > palette.filteredList.length - constants.pageHeight) {
                palette.set(palette.filteredList.length - 1);
            } else {
                palette.move(constants.pageHeight);
            }
        };

        // Move up on the list
        palette.movePageUp = function() {
            // If the user is on the top most command, go to the bottom
            if (palette.selected === 0) {
                palette.set(palette.filteredList.length - 1);
            } else if (palette.selected < constants.pageHeight) {
                palette.set(0);
            } else {
                palette.move(-constants.pageHeight);
            }
        };

        // Run the command
        palette.runFunction = function() {
            // If argument[1] is a event object from clicking on a command
            if (arguments[1] && arguments[1].fn) {
                // Try to run the command that was sent through
                try {
                    arguments[1].fn();
                } finally {
                    hideInput();
                }
            }
            // Otherwise, it is from an enter press, run the selected command
            else {
                try {
                    palette.filteredList[palette.selected].fn();
                } finally {
                    hideInput();
                }
            }
        };
    }

    // Create a custom binding for live values
    function createLiveValueBinding() {
        var livevalue = Object.create(rivets.binders.value);

        livevalue.bind = function (element) {
            this.handler = this.handler || this.publish.bind(this);
            element.addEventListener('keyup', this.handler);
        };

        livevalue.unbind = function (element) {
            if (this.handler) {
                element.removeEventListener('keyup', this.handler);
            }
        };

        rivets.binders['live-value'] = livevalue;
    }

    // Create the HTML behind the command palette
    function createCommandPalette() {
        if (!elements.commandPalette) {
            // HTML to create the palette
            var html = '\
<div class="sp-commandpalette"> \
    <input type="text" class="mousetrap" rv-live-value="palette.command"> \
    <ul class="sp-commandpalette-command-list"> \
        <li rv-each-command="palette.filteredCommands < command"> \
            <a class="sp-commandpalette-command" \
               rv-on-hover="palette.set" \
               rv-on-click="palette.runFunction" \
               rv-class-selected="command.selected" \
               rv-text="command.command"></a> \
        </li> \
    </ul> \
</div>';

            elements.commandPalette = document.createElement('div');
            elements.commandPalette.id = 'sp-commandpalette';
            elements.commandPalette.innerHTML = html;

            elements.workspace = document.getElementById('s4-workspace');
            elements.workspace.appendChild(elements.commandPalette);

            elements.commandList = document.querySelectorAll('.sp-commandpalette-command-list')[0];

            model = new CommandPaletteModel();

            view = rivets.bind(document.querySelector('.sp-commandpalette'), {
                palette: model
            });

            hideInput();
        }
    }

    // Get the command list and sort/exclude
    function getCommandList() {
        var list = CP.CommandList,
            type = util.getSiteType(),
            version = util.getVersionType();

        // Remove command if excluded
        list = list.filter(function(item) {
            if (item.exclude) {
                if (item.exclude.indexOf(type) > -1 ||
                    item.exclude.indexOf(version) > -1) {
                    return 0;
                }
            }

            return 1;
        });

        // Sort through the commands alphabetically
        list.sort(function(a, b) {
            if (a.command < b.command) {
                return -1;
            }

            if (a.command > b.command) {
                return 1;
            }

            return 0;
        });

        return list;
    }

    // Append the CSS styles to the page
    function appendStyles() {
        elements.head = document.getElementsByTagName('head')[0];

        var style = document.createElement('style');
            style.innerHTML = ' \
.sp-commandpalette { \
    background: #41454e; \
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5); \
    margin-left: -250px; \
    position: absolute; \
    top: 100px; \
    left: 50%; \
    width: 500px; \
    z-index: 9999; \
} \
\
.sp-commandpalette input { \
    background: #e6e6e6; \
    box-sizing: border-box; \
    font-size: 24px; \
    height: 40px; \
    margin: 5px; \
    width: 490px; \
} \
\
.sp-commandpalette p { \
    color: #e6e6e6; \
    margin: 10px; \
    margin-top: 5px; \
} \
\
.sp-commandpalette-command-list { \
    list-style: none; \
    margin: 0px 5px 5px; \
    max-height: 330px; \
    overflow-y: auto; \
    padding: 0; \
} \
\
.sp-commandpalette-command { \
    color: #e6e6e6; \
    cursor: pointer; \
    display: block; \
    height: 20px; \
    overflow: hidden; \
    padding: 5px; \
    text-overflow: ellipsis; \
    white-space: nowrap; \
} \
.sp-commandpalette-command:hover { \
    background: rgba(0, 114, 198, 0.5); \
    color: #fff; \
} \
\
.sp-commandpalette .selected { \
    background: rgba(0, 114, 198, 1); \
    color: #fff; \
}';

        elements.head.appendChild(style);
    }

    // Return true if the palette is being displayed
    function isInputVisible() {
        return elements.commandPalette.style['display'] === 'block';
    }

    // Show the palette
    function showInput() {
        if (elements.commandPalette) {
            elements.commandPalette.style['display'] = 'block';
            elements.commandPalette.getElementsByTagName('input')[0].focus();
        }
    }

    // Hide the palette
    function hideInput() {
        if (elements.commandPalette) {
            // Reset the palette to the first option and remove the input value
            model.set(0);
            model.filteredList = model.list;
            model.command = '';

            // Need to reset before setting display to none so we can scroll the
            // command list back to top
            elements.commandPalette.style['display'] = 'none';
            elements.commandPalette.getElementsByTagName('input')[0].value = '';
        }
    }

    // Only run the following hotkey if the palette is visible
    function visibleHotkeyHanlder(key, callback) {
        Mousetrap.bind(key, function(e) {
            if (isInputVisible()) {
                e.preventDefault();
                callback();
            }
        });
    }

    // Add the event handlers to hot keys
    function eventHandlers() {
        visibleHotkeyHanlder('esc', hideInput);
        visibleHotkeyHanlder('up', model.moveUp);
        visibleHotkeyHanlder('down', model.moveDown);
        visibleHotkeyHanlder('pageup', model.movePageUp);
        visibleHotkeyHanlder('pagedown', model.movePageDown);
        visibleHotkeyHanlder('enter', model.runFunction);

        // If the user clicks outside the palette, hide the pallete
        window.onclick = function (e) {
            hideInput();
        };

        // If the user clicks within the palette, prevent the event
        // from bubbling up to the window
        elements.commandPalette.onclick = function (e) {
            e.stopPropagation();
        };
    }

    // Initialise the code
    function initialise() {
        isInitialised = true;

        appendStyles();
        createLiveValueBinding();
        createCommandPalette();
        eventHandlers();
    }

    // Bind the initialisation code to our hotkey
    Mousetrap.bind(['ctrl+shift+l', 'command+shift+l'], function(e) {
        e.preventDefault();

        if (!isInitialised) {
            initialise();
        }

        showInput();
    });
})(CP.Util);
