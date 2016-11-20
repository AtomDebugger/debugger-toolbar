'use babel';

import {CompositeDisposable} from 'atom';

export default {
  subscriptions: null,
  toolBar: null,
  connectButton: null,
  controller: null,
  buttons: null,

  activate() {
    this.subscriptions = new CompositeDisposable;
  },

  provideView() {
    return {
      activate: this.activateView.bind(this),
      dispose: this.disposeView.bind(this)
    };
  },

  consumeToolBar(getToolBar) {
    this.toolBar = getToolBar('debugger-this.toolBar');
    this.buttons = {}

    this.connectButton = this.toolBar.addButton({
      icon: 'plug',
      callback: this.connect.bind(this)
    });

    this.toolBar.addSpacer();

    this.buttons.play = this.toolBar.addButton({
      icon: 'playback-play',
      callback: 'debugger:resume',
      tooltip: 'Resume target'
    });

    this.buttons.pause = this.toolBar.addButton({
      icon: 'playback-pause',
      callback: 'debugger:pause',
      tooltip: 'Pause target'
    });

    this.toolBar.addSpacer();

    this.buttons.next = this.toolBar.addButton({
      iconset: 'debug-icons',
      icon: 'next',
      callback: 'debugger:step-over',
      tooltip: 'Single step, over function calls'
    });

    this.buttons.step = this.toolBar.addButton({
      iconset: 'debug-icons',
      icon: 'step',
      callback: 'debugger:step-into',
      tooltip: 'Single step, in to function calls'
    });

    this.buttons.finish = this.toolBar.addButton({
      iconset: 'debug-icons',
      icon: 'finish',
      callback: 'debugger:step-out',
      tooltip: 'Resume until function return'
    });

    for(b in this.buttons) {
      this.buttons[b].setEnabled(false);
    }
  },

  activateView(controller) {
    this.controller = controller;
    let proxy = controller.debuggerRegistry.getDebuggerProxy()
    this.subscriptions.add(proxy.onSessionEvent(this.sessionEvent.bind(this)));
  },

  disposeView() {
    this.subscriptions.dispose();
  },

  deactivate() {
    if (this.toolBar) {
      this.toolBar.removeItems();
      this.toolBar = null;
    }
  },

  connect() {
    let el = this.connectButton.element;
    let connected = (` ${el.className} `).indexOf(' selected ') > 0;
    if(connected) {
      this.controller.stop();
    } else {
      this.controller.start();
    }
  },

  sessionEvent(ev) {
    let el = this.connectButton.element;
    if (ev.type == 'terminated') {
      el.classList.remove('selected')
    } else {
      el.classList.add('selected')
    }

    enabled = {
      'terminated': [],
      'will-terminate': [],
      'launched': ['pause'],
      'resumed': ['pause'],
      'suspended': ['play', 'next', 'step', 'finish'],
    }[ev.type];
    for(b in this.buttons) {
      this.buttons[b].setEnabled(enabled.indexOf(b) >= 0)
    }
  }
}
