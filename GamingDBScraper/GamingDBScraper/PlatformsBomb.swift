//
//  PlatformsBomb.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 11/9/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation

fileprivate let basePath = "https://www.giantbomb.com/api/"
fileprivate let key = "?api_key=db8a1f65f4f0e52e93b1cfebb475d2bebdd92ad1&format=json"

fileprivate let characterAttributes: [String] =
    [
        "name",
        "deck",
        "gender",
        "id",
        "image"
]


/*
 Name
 Description
 id
 games
 platforms
 gender
 image
 
 */

func filterPlatformGames() {
    var platforms = readInFileData("igdb_platforms.json")
    
    let allGameIds = getAllGameIds()
    
    //Super slow, but just needs to run once so its fine
    for x in 0..<platforms.count {
        var platform = platforms[x]
        
        if var games = platform["games"] as? [Int] {
            games = games.filter({ (id) -> Bool in
                return allGameIds.contains(id)
            })
            
            if games.count == 0 {
                platform.removeValue(forKey: "games")
            } else {
                platform["games"] = games
            }
        }
        
        platforms[x] = platform
    }
    
    //remove all companies without games linked to them
    let count = platforms.count
    
    platforms = platforms.filter({ (platform) -> Bool in
        return platform["games"] != nil
    })
    
    let newCount = platforms.count
    
    print("Removed \(count - newCount) platforms")
    
    do {
        let data = try JSONSerialization.data(withJSONObject: platforms, options: .prettyPrinted)
        save(data: data, to: "plats.json")
    } catch {
        print("Failed to convert platforms to data")
    }
    
}

fileprivate func getAllGameIds() -> [Int] {
    let allGames: [[String: Any]] = readInFileData("igdb_games.json")
    
    let ids = allGames.map { (game) -> Int in
        if let id = game["id"] as? Int {
            return id
        } else {
            return -1
        }
    }
    
    return ids
}

func matchPlatforms() {
    var platforms = readInFileData("plats.json")
    let bombPlatforms = readInFileData("bombPlats.json")
    
    var count = 0
    
    for x in 0..<platforms.count {
        var platform = platforms[x]
        for bp in bombPlatforms {
            if let name = platform["name"] as? String, let bname = bp["name"] as? String, name == bname {
                print(name)
                count += 1
                
                if let deck = bp["deck"] as? String {
                    platform["summary"] = deck
                }
                
                if let images = bp["image"] as? [String: String], platform["logo"] == nil {
                    if let medium = images["medium_url"], let original = images["original_url"] {
                        if !original.contains("2853576-gblogo.png") && !medium.contains("2853576-gblogo.png") {
                            print("Added Image")
                            platform["medium_url"] = medium
                            platform["original_url"] = original
                        }
                    }
                }
                
                platforms[x] = platform
                
                break
            }
        }
    }
    
    do {
        let data = try JSONSerialization.data(withJSONObject: platforms, options: .prettyPrinted)
        save(data: data, to: "platforms.json")
    } catch {
        print("Failed to convert platforms to data")
    }
}

fileprivate func searchForGame(game: String) -> String? {
    let path = "\(basePath)search/\(key)&query=\(game)".replacingOccurrences(of: " ", with: "%20")
    guard let url = URL(string: path) else {
        return nil
    }
    
    let request = URLRequest(url: url)
    
    var gamePath: String?
    
    makeSynchronousRequest(request) { (data) in
        do {
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                if let results = json["results"] as? [[String: Any]] {
                    for item in results {
                        if let type = item["resource_type"] as? String, type == "game" {
                            if let url = item["api_detail_url"] as? String {
                                gamePath = url
                                return
                            }
                        }
                    }
                }
            }
        } catch {
            print("Failed to read in searched data")
        }
    }
    
    return gamePath
}


fileprivate func readInFileData(_ file: String) -> [[String: Any]] {
    if let documentDirectoryUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
        let fileUrl = documentDirectoryUrl.appendingPathComponent(file)
        do {
            let data = try Data(contentsOf: fileUrl)
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]] {
                return json
            } else {
                
            }
        } catch {
            print(error)
        }
    }
    
    return []
}
