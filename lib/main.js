'use babel';

let toolBar;

export function consumeToolBar(getToolBar) {
  toolBar = getToolBar('debugger-toolbar');

  toolBar.addButton({
    icon: 'bug',
    callback: 'debugger:start',
    tooltip: 'Start Debugger'
  });

  toolBar.addButton({
    icon: 'x',
    callback: 'debugger:stop',
    tooltip: 'Stop Debugger'
  });

  toolBar.addSpacer();

  toolBar.addButton({
    icon: 'playback-play',
    callback: 'debugger:resume',
    tooltip: 'Resume target'
  });

  toolBar.addButton({
    icon: 'playback-pause',
    callback: 'debugger:pause',
    tooltip: 'Pause target'
  });

  toolBar.addSpacer();

  toolBar.addButton({
    iconset: 'debug-icons',
    icon: 'next',
    callback: 'debugger:step-over',
    tooltip: 'Single step, over function calls'
  });

  toolBar.addButton({
    iconset: 'debug-icons',
    icon: 'step',
    callback: 'debugger:step-into',
    tooltip: 'Single step, out of function calls'
  });

  toolBar.addButton({
    iconset: 'debug-icons',
    icon: 'finish',
    callback: 'debugger:step-out',
    tooltip: 'Resume until function return'
  });
}

export function deactivate() {
  if (toolBar) {
    toolBar.removeItems();
    toolBar = null;
  }
}
