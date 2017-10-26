//
//  GameImages.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 10/26/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation

fileprivate var gameJson: [[String: Any]] = []
fileprivate let basePath = "https://images.igdb.com/igdb/image/upload/"

func downloadGameImages() {
    readInGameData()
    for id in getGameIds() {
        downloadImage(id)
    }
}

func getGameIds() -> [String] {
    var ids: [String] = []
    print("Parsing games")
    for game in gameJson {
        if let imageData = game["cover"] as? [String: Any] {
            if let path = imageData["cloudinary_id"] as? String {
                ids.append(path)
            }
        }
    }
    return ids
}

func downloadImage(_ id: String) {
    
    let types: [String] = [".jpg", ".png"]
    var done = false
    
    for type in types.reversed() {
        guard let url: URL = URL(string: "\(basePath)\(id)\(type)") else {
            continue
        }
        
        var semaphore = DispatchSemaphore(value: 0)
        
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            defer { semaphore.signal() }
            
            if let _ = error {
                print("ERROR: Failed to get: \(id)\(type)")
                return
            }
            
            guard let data = data, data.count > 0 else {
                print("ERROR: No data for image: \(id)\(type)")
                return
            }
            
            if saveImage(data: data, id: id, type: type) {
                print("saved: \(id)")
                done = true
            }
        }.resume()
        
        semaphore.wait()
        
        if done {
            return
        }
    }
}

fileprivate func saveImage(data: Data, id: String, type: String) -> Bool {
    
    if let documentDirectoryUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
        let imagePath = documentDirectoryUrl.appendingPathComponent("images/\(id)\(type)")
        
        do {
            try data.write(to: imagePath)
        } catch {
            return false
        }
        
        return true
    }
    
    return false
}

func readInGameData() {
    if let documentDirectoryUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
        let fileUrl = documentDirectoryUrl.appendingPathComponent("igdb_games.json")
        do {
            let data = try Data(contentsOf: fileUrl)
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]] {
                gameJson = json
            }
        } catch {
            print(error)
        }
    }
}
