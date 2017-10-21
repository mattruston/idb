//
//  main.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 10/21/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation

let basePath = "https://api-2445582011268.apicast.io"
let key = "be32cf8f710c797b67940515881e533f"
let pageSize = 50

let gameAttributes: [String] =
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

func request(for path: String) -> URLRequest? {
    guard let url = URL(string: "\(basePath)\(path)") else {
        print("ERROR: bad path: \(path)")
        return nil
    }
    
    var request = URLRequest(url: url)
    request.addValue(key, forHTTPHeaderField: "user-key")
    request.addValue("application/json", forHTTPHeaderField: "Accept")
    
    return request
}

func downloadGameData(_ id: Int) {
    guard let request = request(for: "/games/\(id)") else {
        return
    }
    
    var semaphore = DispatchSemaphore(value: 0)
    
    print("Requesting game: \(id)")
    URLSession.shared.dataTask(with: request) { (data, response, error) in
        defer { semaphore.signal() }
        
        if let error = error {
            print("ERROR: \(error)")
            return
        }
        
        guard let data = data else {
            print("ERROR: Data was nil")
            return
        }
        
        guard let newData = filterGameData(data) else {
            print("ERROR: Unable to get filtered Data")
            return
        }
        
        save(data: newData, to: "games.json")
        
        }.resume()
    
    semaphore.wait()
}

func save(data: Data, to file: String) {
    if let documentDirectoryUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
        let fileUrl = documentDirectoryUrl.appendingPathComponent(file)
        
        do {
            let fileHandle = try FileHandle(forWritingTo: fileUrl)
            fileHandle.seekToEndOfFile()
            
            print("saving game data to file...")
            fileHandle.write(data)
            fileHandle.seekToEndOfFile()
            
            if let stringData = ",\n".data(using: .utf8) {
                fileHandle.write(stringData)
            }
            
        } catch {
            print(error)
        }
    }
}

func filterGameData(_ data: Data) -> Data? {
    do {
        if var json = (try JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]])?.first {
            //If things are super slow, we could speed this up by checking a dictionary instead of searching an array
            json = json.filter({ (key, _) -> Bool in
                return gameAttributes.contains(key)
            })
            
            let newData = try JSONSerialization.data(withJSONObject: json, options: .prettyPrinted)
            return newData
            
        } else {
            print("Failed to read JSON how I wanted :c")
        }
    } catch {
        print(error)
    }
    
    return nil
}

func getGamePage(at offset: Int) -> [Int] {
    guard let request = request(for: "/games/?order=popularity:desc&limit=\(pageSize)&offset=\(offset)") else {
        return []
    }
    
    var ids: [Int] = []
    
    var semaphore = DispatchSemaphore(value: 0)
    
    print("Requesting page: \(offset)")
    URLSession.shared.dataTask(with: request) { (data, response, error) in
        defer { semaphore.signal() }
        
        if let error = error {
            print("ERROR: \(error)")
            return
        }
        
        guard let data = data else {
            print("ERROR: Data was nil")
            return
        }
        
        do {
            if let json = (try JSONSerialization.jsonObject(with: data, options: []) as? [[String: Int]]) {
                for dict in json {
                    if let id = dict["id"] {
                        ids.append(id)
                    }
                }
            }
        } catch {
            print(error)
        }
        
        }.resume()
    
    semaphore.wait()
    
    return ids
}

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

getTopGames(through: 1000)
print("Done")
