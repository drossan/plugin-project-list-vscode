# Project List

## Description

My VS Code Extension is a simple tool that lists the contents of a directory in a tree structure. It allows you to specify which directories to ignore and optionally saves the listing to a file.

## Features

- List directory contents in a tree structure.
- Ignore specified directories.
- Optionally save the listing to a file.

## Usage

### Installation

1. Download and install [Visual Studio Code](https://code.visualstudio.com/).
2. Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for `My VS Code Extension` and click Install.

### Running the Extension
1. **Open the Command Palette**:
    - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette.

2. **Execute the Command**:
    - Type `List Directory` and select the command `List Directory` from the list.

3. **Follow the Prompts**:
    - Enter the directory to list (default is the project root).
    - Enter directories to ignore, separated by commas (default is `.git,node_modules,vendor,.idea,.vsc`).
    - Choose whether to create a file named `list_dir_output.txt` in the project root.

4. **View the Results**:
    - If you chose to create the file, you will see a confirmation message, and the file `list_dir_output.txt` will be created in the project root with the directory listing.
    - The directory listing will also be displayed in a new webview panel within VS Code.


## Commands

- `extension.listDir`: Lists the contents of a directory.

## Configuration

You can configure the following settings in the prompts:
- Directory to list (default is the project root).
- Directories to ignore, separated by commas (default is `.git,node_modules,vendor,.idea,.vsc`).
- Whether to create a file named `list_dir_output.txt` in the project root.

## Installation

1. Download and install [Visual Studio Code](https://code.visualstudio.com/).
2. Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for `Project List` and click Install.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/drossan/plugin-project-list-vscode) file for details.
