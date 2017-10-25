//
//  Genres.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 10/24/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation

fileprivate let genreAttributes: [String] =
    [
        "id",
        "name"
]

//MARK: - public functions

func getGenres() {
    let genres = getGenreList()
    for genre in genres {
        downloadGenreData(genre)
    }
}


//MARK: - Private functions

fileprivate func getGenreList() -> [Int] {
    //There are only about 30 genres, so this will get them all
    guard let request = request(for: "/genres/?limit=50&offset=0") else {
        return []
    }
    
    print("Getting genres...")
    return getPage(with: request)
}

fileprivate func downloadGenreData(_ id: Int) {
    guard let request = request(for: "/genres/\(id)") else {
        return
    }
    
    print("Requesting genre: \(id)")
    makeSynchronousRequest(request) { (data) in
        guard let newData = filterGenreData(data) else {
            print("ERROR: Unable to get filtered Data")
            return
        }
        
        save(data: newData, to: "genres.json")
    }
}


fileprivate func filterGenreData(_ data: Data) -> Data? {
    let filteredData = filterData(data) { (json) -> (Any) in
        guard let typedJson = (json as? [[String: Any]])?.first else {
            print("Error: Json in unknown format")
            return json
        }
        
        let filteredJson = typedJson.filter({ (key, _) -> Bool in
            return genreAttributes.contains(key)
        })
        
        return filteredJson
    }
    
    return filteredData
}
