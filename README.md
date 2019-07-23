# Television User Interface Featuring MLB Game Statistics
This web application displays statistics of Major League Baseball games played on a particular date, utilizing public MLB API. 
The unique aspect, however, is that the application is designed to run on a television or set-top box and can be simulated in a
web browser that responds only to the keys of a keyboard that match those of a remote control: arrow keys (UP, DOWN, LEFT, RIGHT), 
ENTER, and Esc (for BACK). 

## Try It Out!
Launch https://www.kenacollins.com/mlb in your web browser. 

By default, the current date's baseball games are displayed but this usually results in a lot of gray placeholder rectangles due
to games that have not yet started or do not yet have a sports writer's editorial recap. 

1. Press UP arrow and then when the < PREVIOUS DATE button has focus (as indicated by a red outline border) press ENTER repeatedly to load data for a desired past date.
2. Press DOWN arrow to return to the grid.
3. Press RIGHT, LEFT, DOWN, and UP arrow keys to navigate within the grid. As each game gains focus, data (home team and score, away team and score, sports writer blurb) appears above and below the photo now enlarged to 150% of its original size.
4. When a game has focus, press ENTER to load a modal dialog that presents a larger image along with a longer sports writer description. Press Esc key to close dialog.

## Specifications

### Functional Spec

The application allows a user to view Major League Baseball game statistics for any desired date. 

The solution encompasses the public MLB API. Documentation is not available but an example of the URL is:

https://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=2019-06-30&sportId=1

The date parameter can be substituted for another date using the yyyy-mm-dd format.

The data for each baseball game on a given date is provided in the JSON feed returned by the API. A photo is provided when
when there is an editorial recap. A list of the games will be presented on the screen.

The user can navigate the application using only the keys on the keyboard that simulate the buttons on a television remote:
Up, Down, Left, Right, Enter, and Escape. A mouse cannot be used for navigation (it can only assist in launching the app in
a web browser).

When a user has navigated to a particular game, the photo will enlarge to 150% of its original size and metadata will appear
above and below it. 

### Technical Spec

The front‐end is implemented using a standard client-side web stack comprising HTML5, CSS3, and JavaScript. Use of third party
libraries and frameworks is strictly limited, with React and Angular on the 'do not use!' list.

The following background image has been provided: http://mlb.mlb.com/mlb/images/devices/ballpark/1920x1080/1.jpg.

### Extra Credit Items

#### Display Current Date on Load

Instead of using the hardcoded JSON feed URL, make the URL dynamic to always show today’s games when the app first loads.

#### Enable Previous and Next Date Selection

Support loading and displaying the https://statsapi.mlb.com/api/v1/schedule for adjacent days.

#### Add Visual Aesthetics

Incorporate transitions, animations, or any other visual aesthetics.

#### Additional Details

Display a details screen or overlay when selecting an item with the Enter key or OK button on a remote.

## Implementation Details

### Cloud Hosting

Try out the application! It is currently up and running on my website at URL https://www.kenacollins.com/mlb.

Note that the above URL launches an index.html file with the bundled bundle.js file that incorporates babel transpilation. 
Therefore, theoretically any browser can be used. 

I tested the app in Firefox 67.0.4 (64-bit), Chrome 75.0.3770.100 (Official Build) (64-bit), and Microsoft Edge 42.17134.1.0.

### Design

I coded the solution utilizing an MVC - Model/View/Controller - design pattern where Controller.js is the controller, StatsListDispMod.js
is the view, and GetStatsDataMod.js is the model. 

While I only have one view and one model for this project, I envision the UI on a grander scale, incorporating all kinds of components 
on different screens needing all kinds of data from different sources. 

I use the term 'display module' to refer to the visual view components. I use the term 'data module' to refer to the model calculations of 
the back-end side of the client that communicates with the file system and external sources to serve up the data the UI needs.

Details follow.

#### Controller.js Controller

The Controller knows about the display modules and the data modules. It is the starting point and manages the needs of both.

The Controller defines the root element that is attached to the body tag of the DOM. The Controller initiates the display modules
by passing them a reference to itself along with a reference to the root DOM element. The Controller then calls the onCreate()
method of each display module to perform initial setup. 

The Controller registers event listeners for key presses (specifically the 'keydown' event applicable to remote control keys and 
the 'keypress' event applicable to all other keys on the keyboard) and forwards them on to the display module in focus.

The reason the Controller passes a reference to itself to the display modules is because if the display modules need to call a data
module, they can invoke the Controller's own requestData() method to carry out the request and pass back the data when it is available.

The reason the Controller sets up the root DOM element and passes it to the display modules is to control the DOM and ensure that 
the display modules don't break each other trying to attach themselves to the body tag. A 'screen real estate agreement' will ensure that
individual display modules can attach themselves to the root element in different locations.

When the user is navigating to another screen, the Controller can destroy the display modules it has launched by invoking each one's 
onDestroy() method.

#### StatsListDispMod.js Display Module

StatsListDispMod.js is a display module geared toward displaying MLB games info on the screen.

It asks the Controller to invoke the MLB stats API for the current date and pass back the results. Once the data has been returned, 
the display module builds four components for the screen:

* Previous and Next Date buttons
* Main header
* Grid featuring games
* Details modal dialog (initially hidden)

It then assigns focus to the first game in the grid. 

The display module processes the key presses it receives from the Controller, enabling it to shift focus from one game to another or to 
navigate from the grid to the date buttons and vice versa.

#### GetStatsDataMod.js Data Module

GetStatsDataMod.js is a data module geared toward retrieving the MLB statistics. It is called by the Controller and its results are passed
on to the StatsListDispMod.js display module.

This data module is coded with the latest ES7 async/await feature to handle the asynchronous nature of the API call. The webpack babel setup
included a step where I installed an additional babel-polyfill package to deal with async/await and cutting edge features like it.

### Third Party Frameworks

None.

Absolutely no third party libraries or frameworks were used:

* HTML5 - The sole HTML5 launch page was hand coded from scratch.
* CSS3 - The CSS3 is all customized and residing in a stylesheet. There are no inline styles. No third party CSS libraries were used. The previous and next date buttons were coded from scratch.
* JavaScript - ES6+ features were used but all the code is pure vanilla JavaScript, including the DOM building and manipulation. No React, Angular, Vue, or even jQuery was used.

### Third Party Tools

#### Webpack

The only outside piece of software residing in the project is webpack for compiling the JavaScript to produce a single bundle.js file 
and for moving all of my custom CSS from the stylesheet file to <style> tags in the dist/index.html file.

Webpack was installed and configured with extra loaders to handle my custom CSS stylesheet and the one supplied MLB background image file.

Also, I installed and configured babel so that ES6+ features not supported by a particular deployment will not impede the application.

### Features

#### Current Date by Default

When the MLB app first loads, it retrieves data for the current date. This is usually not desirable as many games may not have started
and few will have completed, leading to the absence of editorial recaps and photos. The user is subjected to gray rectangles as 
placeholders for games not yet reviewed by sports writers. 

However, all is not lost, the user can navigate the grid to find out the games that are scheduled to ascertain which teams are matched up.

#### Grid

The games are displayed in a grid, sized to fit 7 games per row with wrapping to successive rows. 

I decided that displaying games in a single line would not be an optimal user experience because what happens with the games that are off 
screen on either side? Would the user be happy about pressing an arrow key at the right or left edge of the screen to cause the next game to 
appear without knowing what other games are hidden? 

I felt the answer was 'No!' and I went with a design that displays all of the games on the screen, after conducting an adequate review of the data
and determining there never appear to be more than 15 games in a single day, and I can easily fit 15 games within a full HD 1920 x 1080 pixel space.

The grid is displayed on the screen with rectangular boxes representing each game. If the game has completed and there is an MLB editorial recap 
available, a thumbnail image of the game will appear, otherwise a gray rectangle placeholder is substituted.

Regardless of whether a game has completed or not, the names of the home and away teams are known and these matchups can be seen as the user
navigates through the grid. Games in progress will continually update the scores if one checks back again in a little while.

#### Header

Above the grid is a header that indicates for which date the games data pertains along with an indication of the number of editorial recaps
available (this is provided so the user does not freak out if he or she sees gray rectangles in place of game photos).

Example: 
Stats for Sun Jun 30 2019: 15 total games, 15 editorial recaps available

#### Focused Game

When a game gains focus, its photo, if available, will quickly increase in size to be 150% of its original size. It will be encased in
a reddish/orange border, and a few details about the game will appear above and below the enlarged photo. 

Above the photo will be the names of the home and away teams, this data is always available, accompanied by their scores if available. 
Scores for games in progress get updated in real time. 

Below the enlarged photo will be a headline blurb from a sports writer.

#### Focused and Selected Game

When a user presses Enter on a focused game to select it, a large details modal dialog appears, darkening out the rest of the screen around it,
and displays more information about the chosen game including a longer blurb from a sports writer than was seen when the game was merely
focused. 

All key presses are disabled except for the Escape key to close the dialog.  There is a legend in the corner of the dialog indicating the 
need to press 'Esc' when done.

#### Previous/Next Date Selection

Above the header are two buttons labeled < PREVIOUS DATE and NEXT DATE >. When the user presses the Up arrow key from the top row of the grid, 
focus shifts to the date buttons. The user can navigate right and left between these two buttons.

There is a heading on-screen at all times reminding the user what date is current. Pressing the previous date button makes a request of the API for 
the data of the day before the current date, while pressing the next date button retrieves data one day in the future of the current date.

If a user wishes to go back several days in the past, all he or she needs to do is repeatedly press Enter while the previous date button has focus.
The same is true for repeatedly pressing Enter when the next date button has focus. These actions are possible because focus remains within the
date buttons at the top of the screen until the user presses the Down arrow key to return to the grid.
