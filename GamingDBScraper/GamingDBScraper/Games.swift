//
//  Games.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 10/21/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation

fileprivate let gameAttributes: [String] =
    ["id",
     "name",
     "summary",
     "popularity",
     "total_rating",
     "developers",
     "publishers",
     "genres",
     "first_release_date",
     "screenshots",
     "cover",
     "games",
     "platforms"]

fileprivate let pageSize = 2

//MARK: - public functions

func getTopGames(through index: Int) {
    var offset = 0
    
    while offset + pageSize <= index {
        let ids = getGamePage(at: offset)
        for game in ids {
            downloadGameData(game)
            let delay = arc4random_uniform(2) + 1
            sleep(delay)
        }
        
        offset += pageSize
    }
}


//MARK: - Private functions

fileprivate func downloadGameData(_ id: Int) {
    guard let request = request(for: "/games/\(id)") else {
        return
    }
    
    print("Requesting game: \(id)")
    makeSynchronousRequest(request) { (data) in
        guard let newData = filterGameData(data) else {
            print("ERROR: Unable to get filtered Data")
            return
        }
        
        save(data: newData, to: "game.json")
    }
}


fileprivate func filterGameData(_ data: Data) -> Data? {
    let filteredData = filterData(data) { (json) -> (Any) in
        guard let typedJson = (json as? [[String: Any]])?.first else {
            print("Error: Json in unknown format")
            return json
        }
        
        let filteredJson = typedJson.filter({ (key, _) -> Bool in
            return gameAttributes.contains(key)
        })
        
        return filteredJson
    }
    
    return filteredData
}

fileprivate func getGamePage(at offset: Int) -> [Int] {
    guard let request = request(for: "/games/?order=popularity:desc&limit=\(pageSize)&offset=\(offset)") else {
        return []
    }
    
    return getPage(with: request)
}
