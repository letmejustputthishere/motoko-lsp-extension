# motoko-lsp-extension

I hacked this little extension together to get code completion and compiler warnings with the dfx _language-service command.

This has been only tested on 0.5.2 and assumes your dfx binary lives in /usr/local/bin/dfx (this should be easy to fix). If you need to change the directory, use

    which dfx to get the correct path
    open ~/.vscode/extensions/motoko-lsp-client.motoko-lsp-client-{the-current-version-of-the-extension}/client/out/extension.js
    modify the path in line 12 to the output of which dfx
    safe the file and exit
    restart vscode

It also only works for projects with only one canister specified in dfx.json (but this shouldn’t be to hard to fix). If you want realtime feedback from the server, not only when you manually save your file, go to

    vscode settings
    Files:AutoSave
    set to afterDelay
    Tweak the Files: Auto Save Delay to your preferences.

The code is open source, feel free to jump in! It is very heavily inspired from this.

Note: the dfx _language-service is not (afaik) officially supported yet. There will very likely be a way better client provided by dfinity itself which will render this obsolete. This is for people that don’t want to wait :slight_smile: !

It would be great if anyone wants to collaborate on the two issues mentioned above! Enjoy

