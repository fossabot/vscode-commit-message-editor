const elMessageBox = document.getElementById('message-box');
const elEditForm = document.getElementById('edit-form');
const elSuccessButton = document.getElementById('success-button');
const elCancelButton = document.getElementById('cancel-button');

window.addEventListener('message', (event) => {
    const { data } = event;

    switch (data.command) {
        case 'copyFromSCMInputBox':
            elMessageBox.innerHTML = data.payload.inputBoxValue;
            break;
    }
});

(function () {
    const vscode = acquireVsCodeApi();

    const closeTab = () => {
        vscode.postMessage({
            command: 'closeTab',
        });
    };

    elSuccessButton.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();

        vscode.postMessage({
            command: 'copyFromExtensionMessageBox',
            payload: elMessageBox.value,
        });

        closeTab();
    });

    elCancelButton.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();

        closeTab();
    });
})();