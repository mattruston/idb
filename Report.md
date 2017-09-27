### Motivation

Video games are a beloved childhood pastime that most people continue to enjoy well into adulthood. As a team, each of us grew up playing video games. Video games not only built friendships, but were a great way to experience a rich story with deep characters. There is nothing quite like getting a new game and playing it for the first time. Immersing yourself in a new game is an amazing feeling, but it can be hard to find new video games that you like. We created GamingDB so that people have a place to go to find a new game to play by providing information about everything that comes together to make a video game. From the developers who created the game to the major characters in the game, our site will provide users all the information they need about every aspect of a video game. We will provide information about video games, gaming platforms, major characters, and companies that develop video games. With these models, we will be able to create a great web of information that people can browse through whenever they want to find a new game to play.

### Use Cases

We think that anyone looking to find a new game to play will find our site useful. It will also be useful to anyone with any interest in video games. From the home page, users will be able to see not only all recently released games, but also be able to see the highest rated video games ever. If they are ever looking for a new game to pick up, they can just consult the home page. If they are interested in a specific game or gaming genre, they will be able to go to the Games page and search for a specific game or filter by a certain game genre. Users will definitely find GamingDB useful when looking for new games to play. 

Users will also be able to look up information about individual platforms as well. If they got to the Platforms page, they can see all major platforms ever created. From there, they can click on any platform and see all video games ever created for a given platform. Users will be able to use this information to see what games are available for their consoles
.
If users want to find out more information about a certain video game character, they will be able to go to the Characters page where they will find a list of all video game characters. From there, they will be able to click on any character and find out all kind of information about them including all games that they are in. Users can use this information to find new games to play with their favorite characters.

Video games would not exist without companies spending time and money to develop them. From the Developers page, users can choose a developer and see all the games they have created. From here, users can use this information to find new games to play created by their favorite developers.

### Models

The models chosen for the database are _Games_, _Companies_, _Platforms_, and _Characters_. These were not arbitrary decisions; a deliberate process was employed in order to narrow down the vast number of possibilites available to make a video game database. Both technical and subjective perspectives were employed in the discussions. Next, a description of this process, the specifics for each of these models and their attributes, and the ways in which they are related to one another will be provided.

Immediately after the decision to use video games was taken, an ample list of elements present in this ambit were proposed. In addition to the ones that were ultimately picked, location, genre, voice actors, artistic style, soundtrack, franchises, critics, DLC, release date, and a surplus of other factors were considered but finally discarded due to the impossibility of getting them reliably from available APIs or the lack of relevance in terms of the connectivity that they would provide to the relational graph of models. While some of them were completely ignored beyond this point, others were included as attributes of the chosen models. For instance, _genre_ became an attribute for the _Game_ model, as well as _release date_ which was included also included in the _Platform_ model. It was noted that this combination would enrich both the density of the graph and the relevance of the nodes. The latter was decided by considering the needs of potential users who would be interested in the contents for different models.

The next step was to decide which attributes to enumerate in each model. As mentioned earlier, some were extrapolated from the previous brainstorming session, but a new process was necessary to achieve the optimal quantity and quality of attributes. Again, a comprehensive list of possibilities was compiled and compared against the available APIs. The set difference between the considered options and the availability of these in the initial APIs was then submitted to another process of scrutiny that checked if it was possible to use alternatives to obtain these attributes. A lack of consistent sources and excessive technical difficulites ruled out most of the options in the set difference. After the list of attributes for each model was definitive, the attributes were analyzed to determine which were the most relevant (i.e. would be displayed promptly to the users) and which were secondary. The final product looks as follows:

| Model     | Attributes                               |
| --------- | ---------------------------------------- |
| Game      | Title , Image, Array of Platforms, Description, Ratings, Array of Developers, Major Characters, Array of Game Engines, Average User Rating, Number of User Ratings, Average Critic Rating, Number of Critic Ratings, Time to beat, Player Perspective, Number of Players, Genre, Release Date, Array of Screenshots, Array of Videos, ESRB Rating, PEGI Rating, Array of DLCS, Array of Expansions, Related Games. |
| Company   | Name, Logo, Developer/Publisher/Both, Location, Highest Rated Game, Description of developer, Games they have produced, Developer Website, Social Media Profile. |
| Platform  | Name of the platform, Image, Website, Summary, Alternative Names, Games on the Platform, Developers on this platform, Release Date. |
| Character | Name, Image, Game(s), Platform, Company, Species, Gender, Birthday, Description, Enemies, Friends. |

Additionally, we can observe how the models are to be connected in the databse:

```sequence
Game->Company: Developed by
Company->Game: Developed
Game->Platform: Developed for
Platform->Game: Can play
Character->Game: Appears in
Character->Platform: Appears on
```

### Hosting

We are using the Google Cloud Platform to host our website. The Google Cloud Platform is a powerful back-end service that has many capabilities useful for running applications. It ranges from just giving you an empty Linux virtual machine where you can run your application however you want, to using something like the App Engine which handles many of the common hurdles you normally have to overcome with a back-end service. Because of the many capabilities the App Engine provides, this is the service we are using to run our web application. It has easy commands for deploying a website, can auto scale if the website suddenly starts getting a lot of traffic, and provides useful analytics on the requests made to our application.

An additional benefit of the Google Cloud Platform is that since it is a Google service, using it gives us access to many of Google's powerful resources. If needed, we can rent out numerous cores in order to handle large requests in only seconds. Depending on the nature of our application, we can gain access to special hardware that will optimize our runtime. There are also multiple applications such as a visual processing tool that utilize machine learning models Google has trained, allowing us to take advantage of technologies that would normally be fairly difficult to use.

Using the service, while seemingly complex due to all the tabs and options, is actually made fairly simple. Once you know which platform you are going to use, you mostly will just interact with the options available for that one. To start with the App Engine, you simply go to the App Engine tab, and create a new project. This project will be the workspace for your application, and once created you will be able to see a dashboard with all the relevant information. While there are some ways to interact with your application through the menus, the easiest way to handle things is through the command line shell that exists in the browser. This shell will connect with your current application, and essentially gives you control to the machine you are working with. Once there, deploying your application is fairly simple.

The first step to deploying your application is pulling down the code base onto the Google machine. There are ways to set up the Google Cloud SDK on your own device, but handling it all through their interface makes everything fairly simple. Once you have your project's code, the next thing to do is create an app.yaml and a requirements.txt file. These files will specify to the service how to run your application. They have plenty of documentation on how to set this up depending on your application type. In our case, since we are using a python back-end, we also included a file called appengine_config.py to give additional instructions for loading our python code. Once you have these files added to the root of your project, all you have to do is run:

```gcloud app deploy```

Deploying can take a couple of minutes, but once it has finished your application will now be available at its created domain. By default, Google will generate a URL that includes your project's name, but you can also link your project to a URL that you own in the settings.

One thing we have noticed with deploying changes to code is that sometimes certain files may be cached, and so their changes won't take effect for a while after a deploy.

That is all it takes to get a project up and running using the Google Cloud Platform.

### Tools & Technologies

#### Front-end

- **Bootstrap**
  - Front-end style framework that supplies 
- **SASS**
  - "Syntactically Awesome Style Sheets" a scripting language that compiles down to CSS. SASS provides many useful tools that make creating UI's better and easier, like: inheritance, nesting, variables, mixins, and more. 
- **HTML**
	- The markup language for creating the DOM for a webpage
- **React**
	- 

#### Back-end

- **Flask**
	- A microframework for handling rendering and navigation for the webpage. 

For this project we are currently building out a static webpage using HTML, SCSS and some bootstrap for starter styles in the front end, and Python Flask for the backend. When creating webpages HTML is a requirement, however CSS has had some improvements. We used SCSS which gives us more control and flexibility when writing styles. SCSS has variables, mixins, inheritance, and more useful tools that make creating good responsive UI much easier. SCSS then compiles down into CSS that the browser can read using SASS's command line tool. To render and handle our paging 