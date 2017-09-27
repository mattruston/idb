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