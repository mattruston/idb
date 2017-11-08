//
//  CharactersBomb.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 11/8/17.
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

fileprivate var fileJson: [[String: Any]] = []


/*
 Name
 Description
 id
 games
 platforms
 gender
 image
 
 */

func downloadBombCharacters() {
    readInFileData("igdb_games.json")
    
    var allCharacters: [[String: Any]] = []
    
    for game in fileJson {
        if let name = game["name"] as? String, let gameId = game["id"] as? Int {
            print("\(gameId): \(name)")
            if let gamePath = searchForGame(game: name) {
                print("Found game")
                let characterPaths = getGameCharacters(gamePath: gamePath)
                print("Got characters")
                for characterPath in characterPaths {
                    if var characterJson = getCharacterData(characterPath: characterPath) {
                        //We require that it has an id
                        if let characterId = characterJson["id"] as? Int {
                            
                            var characterExists = false
                            
                            for x in 0..<allCharacters.count {
                                var existing = allCharacters[x]
                                if let pastId = existing["id"] as? Int, pastId == characterId {
                                    characterExists = true
                                    //Same cahracter, just update what our data to include this game
                                    if var updatedGames = existing["games"] as? [Int] {
                                        updatedGames.append(gameId)
                                        existing["games"] = updatedGames
                                    }
                                    
                                    allCharacters[x] = existing
                                }
                            }
                            
                            if characterExists == false {
                                let games: [Int] = [gameId]
                                characterJson["games"] = games
                                allCharacters.append(characterJson)
                            }
                        }
                    }
                }
            }
        }
        break
    }
    
    do {
        let data = try JSONSerialization.data(withJSONObject: allCharacters, options: .prettyPrinted)
        save(data: data, to: "bomb_characters.json")
    } catch {
        print("Failed to convert characters to data")
    }
}

fileprivate func getCharacterData(characterPath: String) -> [String: Any]? {
    let path = "\(characterPath)\(key)"
    
    guard let url = URL(string: path) else {
        return nil
    }
    
    let request = URLRequest(url: url)
    var characterJson: [String: Any]?
    
    makeSynchronousRequest(request) { (data) in
        do {
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                if let results = json["results"] as? [String: Any] {
                    let filteredJson = results.filter({ (key, _) -> Bool in
                        return characterAttributes.contains(key)
                    })
                    
                    characterJson = filteredJson
                }
            }
        } catch {
            print("Error: chracter json in wrong format")
        }
    }
    
    return characterJson
}

fileprivate func getGameCharacters(gamePath: String) -> [String] {
    let path = "\(gamePath)\(key)"
    
    guard let url = URL(string: path) else {
        return []
    }
    
    let request = URLRequest(url: url)
    
    var characterPaths: [String] = []
    
    makeSynchronousRequest(request) { (data) in
        do {
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                if let results = json["results"] as? [String: Any] {
                    if let characters = results["characters"] as? [[String: Any]] {
                        for character in characters {
                            if let characterPath = character["api_detail_url"] as? String {
                                characterPaths.append(characterPath)
                            }
                        }
                    }
                }
            }
        } catch {
            print("Error parsing game data")
        }
    }
    
    return characterPaths
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


fileprivate func readInFileData(_ file: String) {
    if let documentDirectoryUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
        let fileUrl = documentDirectoryUrl.appendingPathComponent(file)
        do {
            let data = try Data(contentsOf: fileUrl)
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]] {
                fileJson = json
            } else {
                
            }
        } catch {
            print(error)
        }
    }
}
