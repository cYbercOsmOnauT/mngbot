# mngbot
Discord Bot for the Moe! Ninja Girls VN

First function will be to provide a picture of the choices and their paths for a specific Season, Chapter, Part.

## Coding style
You may think that the functionality goes through too many different modules but this is to be safe and easy for the future.

Every little thing is in the right module so even if we change the way something is saved later we only need to change the part that actually grabs the info. Like an internal API.

## Internal modules
### choices
For parsing a choice picture that the user wants to see

### data
Module for all kinds of data manipulation like parsing an entered line.

### fs
Filesystem module.

### http
Web request module.

### view
Module for Bot responses.