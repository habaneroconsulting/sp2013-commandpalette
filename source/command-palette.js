/*!
 *  command-palette.js
 */
var CP = CP || {};

(function(util) {
    'use strict';

    var constants = {
            commandHeight: 30,
            indexOfMiddleCommand: 5,
        },
        elements = {
            workspace: document.getElementById('s4-workspace')
        },
        isInitialised = false,
        model = new CommandPaletteModel();

    /**
     * CommandPaletteModel for Knockout
     */
    function CommandPaletteModel() {
        var palette = this,
            list = getCommandList();

        palette.command  = ko.observable('');
        palette.selected = ko.observable(0);

        // Filter commands based on the typed keyword
        palette.filteredCommands = ko.computed(function() {
            var filter = palette.command().toLowerCase();

            // If there is no word, show all commands
            if (!filter) {
                return list;
            }
            // Filter the results
            else {
                return ko.utils.arrayFilter(list, function(command) {
                    // After each re-filter, select the first result
                    palette.selected(0);
                    return command.command.toLowerCase().indexOf(filter) > -1;
                });
            }
        });

        // Move down on the list
        palette.moveDown = function() {
            // If the user is already on the bottom most command, go back to the top
            if (palette.selected() === palette.filteredCommands().length - 1) {
                palette.selected(0);

                elements.commandList.scrollTop = 0;
            } else {
                var paletteIndex = palette.selected() + 1;
                palette.selected(paletteIndex);
                elements.commandList.scrollTop = (paletteIndex - constants.indexOfMiddleCommand) * constants.commandHeight;
            }
        };

        // Move up on the list
        palette.moveUp = function() {
            // If the user is on the top most command, go to the bottom
            if (palette.selected() === 0) {
                palette.selected(palette.filteredCommands().length - 1);

                elements.commandList.scrollTop = elements.commandList.scrollHeight;
            } else {
                var paletteIndex = palette.selected() - 1;
                palette.selected(paletteIndex);
                elements.commandList.scrollTop = (paletteIndex - constants.indexOfMiddleCommand) * constants.commandHeight;
            }
        };

        // Run the command
        palette.runFunction = function() {
            var index = palette.selected();
            palette.filteredCommands()[index].fn();
            hideInput();
        };
    }

    // Create the HTML behind the command palette
    function createCommandPalette() {
        if (!elements.commandPalette) {
            // HTML to create the palette
            var html = '\
                <div class="sp-commandpalette"> \
                    <input type="text" class="mousetrap" data-bind="value: command, valueUpdate: \'input\'"> \
                    <ul class="sp-commandpalette-command-list" data-bind="foreach: filteredCommands"> \
                        <li class="sp-commandpalette-command" data-bind="click: $parent.runFunction, css: { \'sp-commandpalette-command--selected\': $parent.selected() == $index() }, text: command"></li> \
                    </ul> \
                    <p data-bind="visible: filteredCommands().length == 0">No results</p> \
                </div> \
            ';

            elements.commandPalette = document.createElement('div');
            elements.commandPalette.id = 'sp-commandpalette';
            elements.commandPalette.innerHTML = html;

            elements.workspace.appendChild(elements.commandPalette);

            elements.commandList = document.querySelectorAll('.sp-commandpalette-command-list')[0];

            ko.applyBindings(model);

            hideInput();
        }
    }

    // Get the command list and sort/exclude
    function getCommandList() {
        var list = CP.CommandList,
            type = util.getSiteType();

        // Remove command if excluded
        list = list.filter(function(item) {
            if (item.exclude && item.exclude.indexOf(type) > -1) {
                return 0;
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
            style.innerHTML = " \
.sp-commandpalette { \
    background: #41454e; \
    box-shadow: 0 0 30px 0 rgba(0,0,0,0.47); \
    margin-left: -250px; \
    position: absolute; \
    top: 100px; \
    left: 50%; \
    width: 500px; \
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
    padding: 5px; \
    height: 20px; \
    overflow: hidden; \
    text-overflow: ellipsis; \
    white-space: nowrap; \
} \
\
.sp-commandpalette-command:hover { \
    background: #205b8a; \
    color: #fff; \
} \
\
.sp-commandpalette-command--selected { \
    background: #0072c6; \
    color: #fff; \
} \
        ";

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
            elements.commandPalette.style['display'] = 'none';
            elements.commandPalette.getElementsByTagName('input')[0].value = '';

            // Reset the palette to the first option and remove the input value
            model.selected(0);
            model.command('');
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
    function hotkeyHandler() {
        visibleHotkeyHanlder('esc', hideInput);
        visibleHotkeyHanlder('up', model.moveUp);
        visibleHotkeyHanlder('down', model.moveDown);
        visibleHotkeyHanlder('enter', model.runFunction);
    }

    // Initialise the code
    function initialise() {
        isInitialised = true;

        appendStyles();
        createCommandPalette();
        hotkeyHandler();
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