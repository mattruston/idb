//
//  GameImages.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 10/26/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation

fileprivate var fileJson: [[String: Any]] = []
fileprivate let basePath = "https://images.igdb.com/igdb/image/upload/"

// MARK: - Games

func downloadGameImages() {
    readInFileData("igdb_games.json")
    for id in getGameIds() {
        downloadImage(id)
    }
}

fileprivate func getGameIds() -> [String] {
    var ids: [String] = []
    print("Parsing games")
    for game in fileJson {
        if let imageData = game["cover"] as? [String: Any] {
            if let path = imageData["cloudinary_id"] as? String {
                ids.append(path)
            }
        }
    }
    return ids
}


// MARK: - Platform

func downloadPlatformImages() {
    readInFileData("igdb_platforms.json")
    for id in getPlatformIds() {
        downloadImage(id)
    }
}

fileprivate func getPlatformIds() -> [String] {
    var ids: [String] = []
    print("Parsing platforms")
    for platform in fileJson {
        if let imageData = platform["logo"] as? [String: Any] {
            if let path = imageData["cloudinary_id"] as? String {
                ids.append(path)
            }
        }
    }
    return ids
}

// MARK: - Company

func downloadCompanyImages() {
    readInFileData("igdb_companies.json")
    for id in getCompanyIds() {
        downloadImage(id)
    }
}

fileprivate func getCompanyIds() -> [String] {
    var ids: [String] = []
    print("Parsing companies")
    for company in fileJson {
        if let imageData = company["logo"] as? [String: Any] {
            if let path = imageData["cloudinary_id"] as? String {
                ids.append(path)
            }
        }
    }
    return ids
}


// MARK: - Helpers

fileprivate func downloadImage(_ id: String) {
    
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

fileprivate func readInFileData(_ file: String) {
    if let documentDirectoryUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
        let fileUrl = documentDirectoryUrl.appendingPathComponent(file)
        do {
            let data = try Data(contentsOf: fileUrl)
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]] {
                fileJson = json
            } else {
                //For some reason something isnt the right type of dictionary, so we want to filter that out
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [Any] {
                    print("Json had: \(json.count)")
                    if let filtered = json.filter({ (item) -> Bool in
                        return item is [String: Any]
                    }) as? [[String: Any]] {
                        print("filtered had: \(filtered.count)")
                        fileJson = filtered
                    }
                }
            }
        } catch {
            print(error)
        }
    }
}
