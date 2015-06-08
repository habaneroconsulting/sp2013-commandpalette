/*! command-palette.js */

var CP = CP || {};

(function (util, rivets, Mousetrap) {
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
	function CommandPaletteModel () {
		var _this = this;

		_this.list = getCommandList();

		_this.command  = '';
		_this.filteredList = _this.list;
		_this.isEmpty = false;
		_this.selected = 0;

		// Filter commands based on the typed keyword
		_this.filteredCommands = function () {
			var filter = _this.command;

			// If there is no word, show all commands
			if (!filter) {
				_this.isEmpty = false;

				_this.filteredList = _this.list;
			} else {
				// Filter the results
				_this.filteredList = _this.list.filter(function (item) {
					return item.command.toLowerCase().indexOf(filter.toLowerCase()) > -1;
				});

				if (_this.filteredList.length === 0) {
					_this.isEmpty = true;
				} else {
					_this.isEmpty = false;
				}
			}

			// Reset selected state
			_this.set(0);

			return _this.filteredList;
		};

		// Set the command to a specific index
		_this.set = function (index) {
			// Reset selected states
			_this.list.map(function (element) {
				element.selected = false;
			});

			// Keep track of index
			_this.selected = index;

			// Select command for model
			if (_this.filteredList.length > 0) {
				_this.filteredList[index].selected = true;
			}

			elements.commandList.scrollTop = (index - constants.indexOfMiddleCommand) * constants.commandHeight;
		};

		_this.move = function (index) {
			_this.set(_this.selected + index);
		};

		// Move down on the list
		_this.moveDown = function () {
			// If the user is already on the bottom most command, go back to the top
			if (_this.selected === _this.filteredList.length - 1) {
				_this.set(0);
			} else {
				_this.move(1);
			}
		};

		// Move up on the list
		_this.moveUp = function () {
			// If the user is on the top most command, go to the bottom
			if (_this.selected === 0) {
				_this.set(_this.filteredList.length - 1);
			} else {
				_this.move(-1);
			}
		};

		// Move down on the list
		_this.movePageDown = function () {
			// If the user is already on the bottom most command, go back to the top
			if (_this.selected === _this.filteredList.length - 1) {
				_this.set(0);
			} else if (_this.selected > _this.filteredList.length - constants.pageHeight) {
				_this.set(_this.filteredList.length - 1);
			} else {
				_this.move(constants.pageHeight);
			}
		};

		// Move up on the list
		_this.movePageUp = function () {
			// If the user is on the top most command, go to the bottom
			if (_this.selected === 0) {
				_this.set(_this.filteredList.length - 1);
			} else if (_this.selected < constants.pageHeight) {
				_this.set(0);
			} else {
				_this.move(-constants.pageHeight);
			}
		};

		_this.reset = function () {
			// Reset the palette to the first option and remove the input value
			_this.set(0);
			_this.filteredList = _this.list;
			_this.command = '';
			_this.isEmpty = false;
		};

		// Run the command
		_this.runFunction = function () {
			// If argument[1] is a event object from clicking on a command
			if (arguments[1] && arguments[1].fn) {
				// Try to run the command that was sent through
				try {
					arguments[1].fn();
				} finally {
					hideInput();
				}
			} else {
				// Otherwise, it is from an enter press, run the selected command
				try {
					_this.filteredList[_this.selected].fn();
				} finally {
					hideInput();
				}
			}
		};
	}

	// Create a custom binding for live values
	function createLiveValueBinding () {
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
			var html = '<div class="sp-commandpalette">' +
					'<input type="text" class="mousetrap" rv-live-value="palette.command">' +
					'<ul class="sp-commandpalette-command-list">' +
						'<li class="sp-commandpalette-empty" rv-show="palette.isEmpty" style="display: none;">No commands match your query.</li>' +
						'<li rv-each-command="palette.filteredCommands < command">' +
							'<a class="sp-commandpalette-command"' +
							   ' rv-on-hover="palette.set"' +
							   ' rv-on-click="palette.runFunction"' +
							   ' rv-class-selected="command.selected"' +
							   ' rv-text="command.command"></a>' +
						'</li>' +
					'</ul>' +
				'</div>';

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
		list = list.filter(function (item) {
			if (item.exclude) {
				if (item.exclude.indexOf(type) > -1 ||
					item.exclude.indexOf(version) > -1) {
					return 0;
				}
			}

			return 1;
		});

		// Sort through the commands alphabetically
		list.sort(function (a, b) {
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

		style.innerHTML = '' +
			'.sp-commandpalette {' +
				'background: #41454e;' +
				'box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);' +
				'margin-left: -250px;' +
				'position: absolute;' +
				'top: 100px;' +
				'left: 50%;' +
				'width: 500px;' +
				'z-index: 9999;' +
			'}' +
			'.sp-commandpalette input {' +
				'background: #e6e6e6;' +
				'box-sizing: border-box;' +
				'font-size: 24px;' +
				'height: 40px;' +
				'margin: 5px;' +
				'padding: 4px 4px 0;' +
				'width: 490px;' +
			'}' +
			'.sp-commandpalette p {' +
				'color: #e6e6e6;' +
				'margin: 10px;' +
				'margin-top: 5px;' +
			'}' +
			'.sp-commandpalette-empty {' +
				'color: #e6e6e6;' +
				'height: 20px;' +
				'overflow: hidden;' +
				'padding: 5px;' +
			'}' +
			'.sp-commandpalette-command-list {' +
				'list-style: none;' +
				'margin: 0px 5px 5px;' +
				'max-height: 330px;' +
				'overflow-y: auto;' +
				'padding: 0;' +
			'}' +
			'.sp-commandpalette-command {' +
				'color: #e6e6e6;' +
				'cursor: pointer;' +
				'display: block;' +
				'height: 20px;' +
				'line-height: 20px;' +
				'overflow: hidden;' +
				'padding: 5px;' +
				'text-overflow: ellipsis;' +
				'white-space: nowrap;' +
			'}' +
			'.sp-commandpalette-command:hover {' +
				'background: rgba(0, 114, 198, 0.5);' +
				'color: #fff;' +
			'}' +
			'.sp-commandpalette .selected {' +
				'background: rgba(0, 114, 198, 1);' +
				'color: #fff;' +
			'}';

		elements.head.appendChild(style);
	}

	// Return true if the palette is being displayed
	function isInputVisible() {
		return elements.commandPalette.style.display === 'block';
	}

	// Show the palette
	function showInput() {
		if (elements.commandPalette) {
			elements.commandPalette.style.display = 'block';
			elements.commandPalette.getElementsByTagName('input')[0].focus();
		}
	}

	// Hide the palette
	function hideInput() {
		if (elements.commandPalette) {
			model.reset();

			// Need to reset before setting display to none so we can scroll the
			// command list back to top
			elements.commandPalette.style.display = 'none';
			elements.commandPalette.getElementsByTagName('input')[0].value = '';
		}
	}

	// Only run the following hotkey if the palette is visible
	function visibleHotkeyHanlder(key, callback) {
		Mousetrap.bind(key, function (e) {
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

		// Open page in a new window
		visibleHotkeyHanlder(['shift+enter', 'mod+enter'], function () {
			util.openInNewWindow = true;
			model.runFunction();
		});

		visibleHotkeyHanlder('enter', function () {
			util.openInNewWindow = false;
			model.runFunction();
		});

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
	Mousetrap.bind(['ctrl+shift+l', 'command+shift+l'], function (e) {
		e.preventDefault();

		if (!isInitialised) {
			initialise();
		}

		showInput();
	});
})(CP.Util, window.rivets, window.Mousetrap);
