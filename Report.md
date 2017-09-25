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
