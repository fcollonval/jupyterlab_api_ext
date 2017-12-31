import { 
  Menu, Widget
} from "@phosphor/widgets";

import { 
  Dialog, ICommandPalette, showDialog
 } from "@jupyterlab/apputils";

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  IMainMenu
} from '@jupyterlab/mainmenu';

import { 
  HelloWorld
} from "./helloworld";

import '../style/index.css';

/**
 * The command IDs used by the plugin.
 */
export
namespace CommandIDs {
  export
  const get: string = 'helloworld:get';

  export
  const post: string = 'helloworld:post';

  export
  const postReply: string = 'helloworld:post-reply';
};

/**
 * Activate the "Hello World" extension.
 */
function activateHelloWorldExtension(app: JupyterLab, palette: ICommandPalette, mainMenu: IMainMenu): void {

  console.log('JupyterLab extension jupyterlab_api_ext is activated!');

  const category = 'Hello World';
  const { commands } = app;

  let helloWorld = new HelloWorld();

  commands.addCommand(CommandIDs.get, {
    label: 'Get',
    caption: 'Send a GET request to the Python server extension',
    execute: () => {
      console.log('Emit GET request.');
      helloWorld.get();
    }
  });

  commands.addCommand(CommandIDs.post, {
    label: 'Post',
    caption: 'Send a POST request to the Python server extension',
    execute: () => {
      console.log('Emit POST request.');
      helloWorld.post();
    }
  });

  commands.addCommand(CommandIDs.postReply, {
    label: 'Post and reply',
    caption: 'Send a POST request to the Python server extension with some data and get a feedback.',
    execute: () => {
      console.log('Emit POST request exchanging data in JSON format.');

      // Generate Dialog body
      let bodyDialog = document.createElement('div');
      let nameLabel = document.createElement('label');
      nameLabel.textContent = "Name: "
      let nameInput = document.createElement('input');
      nameInput.className = "jp-mod-styled";
      bodyDialog.appendChild(nameLabel);
      bodyDialog.appendChild(nameInput);

      showDialog({
        title: "What's your name",
        body: new Widget({node: bodyDialog}),
        buttons: [Dialog.cancelButton(), Dialog.okButton()]
      }).then(result => {
        if (result.button.accept){
          let name = nameInput.value;
          helloWorld.postReply(name).then(response => {
            showDialog({
              title: "Greetings",
              body: response.greetings,
              buttons: [Dialog.okButton()]
            });
          });
        }
      });

    }
  });

  // Add commands and menu itmes.
  let menu = new Menu({ commands });
  menu.title.label = category;
  [
    CommandIDs.get,
    CommandIDs.post,
    CommandIDs.postReply,
  ].forEach(command => {
    palette.addItem({ command, category });
    menu.addItem({ command });
  });
  mainMenu.addMenu(menu, {rank: 100});
}

/**
 * Initialization data for the jupyterlab_api_ext extension.
 */
const helloWorldExtension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_api_ext',
  autoStart: true,
  activate: activateHelloWorldExtension,
  requires: [
    ICommandPalette,
    IMainMenu,
  ]
};

export default helloWorldExtension;
