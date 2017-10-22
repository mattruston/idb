import json
import datetime
import models
from datetime import date


class Parser:

    iso_to_country = {'642': 'Romania', '144': 'Sri Lanka', '686': 'Senegal', '630': 'Puerto Rico', '705': 'Slovenia', '344': 'Hong Kong', '548': 'Vanuatu', '212': 'Dominica', '752': 'Sweden', '702': 'Singapore', '484': 'Mexico', '860': 'Uzbekistan', '004': 'Afghanistan', '540': 'New Caledonia', '010': 'Antarctica', '288': 'Ghana', '620': 'Portugal', '086': 'British Indian Ocean Territory', '214': 'Dominican Republic', '024': 'Angola', '248': 'Åland Islands', '833': 'Isle of Man', '178': 'Congo', '581': 'United States Minor Outlying Islands', '442': 'Luxembourg', '380': 'Italy', '570': 'Niue', '740': 'Suriname', '578': 'Norway', '850': 'Virgin Islands, U.S.', '250': 'France', '096': 'Brunei Darussalam', '663': 'Saint Martin (French part)', '660': 'Anguilla', '508': 'Mozambique', '296': 'Kiribati', '768': 'Togo', '008': 'Albania', '780': 'Trinidad and Tobago', '882': 'Samoa', '056': 'Belgium', '364': 'Iran, Islamic Republic of', '792': 'Turkey', '192': 'Cuba', '238': 'Falkland Islands (Malvinas)', '659': 'Saint Kitts and Nevis', '140': 'Central African Republic', '196': 'Cyprus', '674': 'San Marino', '064': 'Bhutan', '410': 'Korea, Republic of', '554': 'New Zealand', '858': 'Uruguay', '670': 'Saint Vincent and the Grenadines', '682': 'Saudi Arabia', '368': 'Iraq', '533': 'Aruba', '795': 'Turkmenistan', '591': 'Panama', '440': 'Lithuania', '690': 'Seychelles', '270': 'Gambia', '031': 'Azerbaijan', '304': 'Greenland', '254': 'French Guiana', '218': 'Ecuador', '132': 'Cape Verde', '400': 'Jordan', '426': 'Lesotho', '446': 'Macao', '876': 'Wallis and Futuna', '784': 'United Arab Emirates', '500': 'Montserrat', '116': 'Cambodia', '772': 'Tokelau', '036': 'Australia', '634': 'Qatar', '818': 'Egypt', '180': 'Congo, the Democratic Republic of the', '231': 'Ethiopia', '028': 'Antigua and Barbuda', '834': 'Tanzania, United Republic of', '736': 'Sudan', '258': 'French Polynesia', '246': 'Finland', '040': 'Austria', '332': 'Haiti', '242': 'Fiji', '744': 'Svalbard and Jan Mayen', '156': 'China', '608': 'Philippines', '020': 'Andorra', '558': 'Nicaragua', '398': 'Kazakhstan', '480': 'Mauritius', '434': 'Libyan Arab Jamahiriya', '804': 'Ukraine', '162': 'Christmas Island', '706': 'Somalia', '748': 'Swaziland', '136': 'Cayman Islands', '580': 'Northern Mariana Islands', '854': 'Burkina Faso', '492': 'Monaco', '174': 'Comoros', '234': 'Faroe Islands', '404': 'Kenya', '166': 'Cocos (Keeling) Islands', '516': 'Namibia', '408': "Korea, Democratic People's Republic of", '704': 'Viet Nam', '652': 'Saint Barthélemy', '662': 'Saint Lucia', '800': 'Uganda', '074': 'Bouvet Island', '528': 'Netherlands', '776': 'Tonga', '360': 'Indonesia', '458': 'Malaysia', '454': 'Malawi', '788': 'Tunisia', '384': "Côte d'Ivoire", '438': 'Liechtenstein', '392': 'Japan',
                      '048': 'Bahrain', '032': 'Argentina', '524': 'Nepal', '050': 'Bangladesh', '328': 'Guyana', '092': 'Virgin Islands, British', '076': 'Brazil', '678': 'Sao Tome and Principe', '184': 'Cook Islands', '104': 'Myanmar', '756': 'Switzerland', '470': 'Malta', '626': 'Timor-Leste', '124': 'Canada', '068': 'Bolivia, Plurinational State of', '276': 'Germany', '320': 'Guatemala', '222': 'El Salvador', '716': 'Zimbabwe', '052': 'Barbados', '616': 'Poland', '060': 'Bermuda', '504': 'Morocco', '466': 'Mali', '175': 'Mayotte', '275': 'Palestinian Territory, Occupied', '300': 'Greece', '266': 'Gabon', '070': 'Bosnia and Herzegovina', '654': 'Saint Helena, Ascension and Tristan da Cunha', '232': 'Eritrea', '840': 'United States', '574': 'Norfolk Island', '832': 'Jersey', '388': 'Jamaica', '688': 'Serbia', '233': 'Estonia', '356': 'India', '204': 'Benin', '512': 'Oman', '646': 'Rwanda', '764': 'Thailand', '376': 'Israel', '428': 'Latvia', '430': 'Liberia', '474': 'Martinique', '530': 'Netherlands Antilles', '496': 'Mongolia', '334': 'Heard Island and McDonald Islands', '170': 'Colombia', '417': 'Kyrgyzstan', '108': 'Burundi', '724': 'Spain', '308': 'Grenada', '598': 'Papua New Guinea', '324': 'Guinea', '643': 'Russian Federation', '414': 'Kuwait', '262': 'Djibouti', '760': 'Syrian Arab Republic', '478': 'Mauritania', '562': 'Niger', '586': 'Pakistan', '348': 'Hungary', '051': 'Armenia', '422': 'Lebanon', '694': 'Sierra Leone', '798': 'Tuvalu', '372': 'Ireland', '894': 'Zambia', '100': 'Bulgaria', '340': 'Honduras', '292': 'Gibraltar', '498': 'Moldova, Republic of', '044': 'Bahamas', '600': 'Paraguay', '807': 'Macedonia, the former Yugoslav Republic of', '352': 'Iceland', '583': 'Micronesia, Federated States of', '666': 'Saint Pierre and Miquelon', '208': 'Denmark', '520': 'Nauru', '612': 'Pitcairn', '316': 'Guam', '796': 'Turks and Caicos Islands', '499': 'Montenegro', '762': 'Tajikistan', '191': 'Croatia', '336': 'Holy See (Vatican City State)', '862': 'Venezuela, Bolivarian Republic of', '887': 'Yemen', '239': 'South Georgia and the South Sandwich Islands', '090': 'Solomon Islands', '585': 'Palau', '152': 'Chile', '188': 'Costa Rica', '604': 'Peru', '112': 'Belarus', '312': 'Guadeloupe', '624': 'Guinea-Bissau', '584': 'Marshall Islands', '703': 'Slovakia', '012': 'Algeria', '450': 'Madagascar', '084': 'Belize', '016': 'American Samoa', '826': 'United Kingdom', '120': 'Cameroon', '638': 'Réunion', '462': 'Maldives', '260': 'French Southern Territories', '268': 'Georgia', '710': 'South Africa', '418': "Lao People's Democratic Republic", '566': 'Nigeria', '072': 'Botswana', '203': 'Czech Republic', '732': 'Western Sahara', '158': 'Taiwan, Province of China', '226': 'Equatorial Guinea', '831': 'Guernsey', '148': 'Chad'}

    def __init__(self):
        self.game_dict = {}
        self.platform_dict = {}
        self.company_dict = {}
        self.character_dict = {}
        self.genre_dict = {}

    def get_sql_date(self, epoch):
        return date.fromtimestamp(epoch / 1000).strftime('%Y-%m-%d %H:%M:%S')

    def parse_games(self):
        with open('igdb_games.json') as game_data:
            data = json.load(game_data)
            for game in data:
                d = {}
                d['title'] = game['name']
                if 'first_release_date' in game:
                    d['release_date'] = self.get_sql_date(
                        game['first_release_date'])
                if 'summary' in game:
                    d['description'] = game['summary']
                if 'total_rating' in game:
                    d['rating'] = game['total_rating']
                if 'image_url' in game:
                    d['image_url'] = 'http:' + \
                        game['cover']['url'].strip(
                            '\\').replace('/t_thumb', "")
                screenshots = []
                if 'screenshots' in game:
                    for image in game['screenshots']:
                        screenshots.append(
                            'http:' + image['url'].strip('\\').replace('/t_thumb', ""))
                # d['screenshot_urls'] = screenshots
                self.game_dict[game['id']] = d
                new_row = models.Game(**d)
                models.db.session.add(new_row)
                models.db.session.commit()

    def parse_platforms(self):
        with open('igdb_platforms.json') as platform_data:
            data = json.load(platform_data)
            for platform in data:
                d = {}
                d['name'] = platform['name']
                if 'summary' in platform:
                    d['description'] = platform['summary']
                if 'release_date' in platform:
                    d['release_date'] = self.get_sql_date(
                        platform['release_date'])
                if 'website' in platform:
                    d['website'] = platform['website']
                if 'logo' in platform:
                    d['image_url'] = 'http:' + \
                        platform['logo']['url'].strip(
                            '\\').replace('/t_thumb', "")
                self.platform_dict[platform['id']] = d
                new_row = models.Platform(**d)
                if 'games' in platform:
                    for game in platform['games']:
                        if game in self.game_dict:
                            game_row = models.Game.query.filter(models.Game.title == self.game_dict[game]['title']).first()
                            game_row.platforms.append(new_row)
                models.db.session.add(new_row)
                models.db.session.commit()

    def parse_companies(self):
        with open('igdb_companies.json') as company_data:
            data = json.load(company_data)
            for company in data:
                if not company:
                    continue
                d = {}
                d['name'] = company['name']
                if 'description' in company:
                    d['description'] = company['description']
                if 'logo' in company:
                    d['image_url'] = 'http:' + \
                        company['logo']['url'].strip(
                            '\\').replace('/t_thumb', "")
                if 'website' in company:
                    d['website'] = company['website']
                if 'country' in company:
                    country_code = str(company['country'])
                    d['location'] = self.iso_to_country[country_code if len(
                        country_code) > 2 else '0' + country_code]
                self.company_dict[company['id']] = d
                new_row = models.Developer(**d)
                if 'games' in company:
                    for game in company['games']:
                        if game in self.game_dict:
                            game_row = models.Game.query.filter(models.Game.title == self.game_dict[game]['title']).first()
                            game_row.developers.append(new_row)
                models.db.session.add(new_row)
                models.db.session.commit()
