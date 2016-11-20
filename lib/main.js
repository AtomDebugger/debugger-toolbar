'use babel';

export default {
  toolBar: null,
  connectButton: null,
  controller: null,

  provideView() {
    return {activate: this.activateView.bind(this), dispose: function () {}};
  },

  consumeToolBar(getToolBar) {

    this.toolBar = getToolBar('debugger-this.toolBar');

    this.connectButton = this.toolBar.addButton({
      icon: 'plug',
      callback: this.connect.bind(this)
    });

    this.toolBar.addSpacer();

    this.toolBar.addButton({
      icon: 'playback-play',
      callback: 'debugger:resume',
      tooltip: 'Resume target'
    });

    this.toolBar.addButton({
      icon: 'playback-pause',
      callback: 'debugger:pause',
      tooltip: 'Pause target'
    });

    this.toolBar.addSpacer();

    this.toolBar.addButton({
      iconset: 'debug-icons',
      icon: 'next',
      callback: 'debugger:step-over',
      tooltip: 'Single step, over function calls'
    });

    this.toolBar.addButton({
      iconset: 'debug-icons',
      icon: 'step',
      callback: 'debugger:step-into',
      tooltip: 'Single step, in to function calls'
    });

    this.toolBar.addButton({
      iconset: 'debug-icons',
      icon: 'finish',
      callback: 'debugger:step-out',
      tooltip: 'Resume until function return'
    });
  },

  activateView(controller) {
    this.controller = controller;
    window.debugToolbar = this;
  },

  dispose() {},

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
      el.classList.remove('selected')
    } else {
      this.controller.start();
      el.classList.add('selected')
    }
  }
}
