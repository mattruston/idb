//
//  Platforms.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 10/21/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation


//versions
//developers
//company
//manufacturers
//company
//release_dates
//summary
fileprivate let platformAttributes: [String] =
    ["id",
    "name",
    "logo",
    "website",
    "games",
        ]

fileprivate let pageSize = 1
fileprivate let platformCount = 136

//MARK: - public functions

func getPlatforms(through index: Int) {
    var offset = 0

    while offset + pageSize <= index {
        let ids = getPlatformPage(at: offset)
        for platform in ids {
            downloadPlatformData(platform)
            let delay = arc4random_uniform(2) + 1
            sleep(delay)
        }

        offset += pageSize
    }
}


//MARK: - Private functions

fileprivate func downloadPlatformData(_ id: Int) {
    guard let request = request(for: "/platforms/\(id)") else {
        return
    }

    print("Requesting platform: \(id)")
    makeSynchronousRequest(request) { (data) in
        guard let newData = filterPlatformData(data) else {
            print("ERROR: Unable to get filtered Data")
            return
        }

        save(data: newData, to: "platforms.json")
    }
}


fileprivate func filterPlatformData(_ data: Data) -> Data? {
    let filteredData = filterData(data) { (json) -> (Any) in
        guard let typedJson = (json as? [[String: Any]])?.first else {
            print("Error: Json in unknown format")
            return json
        }

        var filteredJson = typedJson.filter({ (key, _) -> Bool in
            return platformAttributes.contains(key)
        })
        
        if let firstVersion = (typedJson["versions"] as? [[String: Any]])?.first {
            if let summary = firstVersion["summary"] {
                filteredJson["summary"] = summary
            }
            
            if let firstDate = ((firstVersion["release_dates"] as? [[String: Any]])?.first)?["date"] {
                filteredJson["release_date"] = firstDate
            }
            
            var companies: [Any] = []
            
            if let manufacturers = firstVersion["manufacturers"] as? [[String: Any]] {
                for dict in manufacturers {
                    if let company = dict["company"] {
                        companies.append(company)
                    }
                }
            }
            
            if let developers = firstVersion["developers"] as? [[String: Any]] {
                for dict in developers {
                    if let company = dict["company"] {
                        companies.append(company)
                    }
                }
            }
            
            if companies.count > 0 {
                filteredJson["companies"] = companies
            }
        }

        return filteredJson
    }

    return filteredData
}

fileprivate func getPlatformPage(at offset: Int) -> [Int] {
    guard let request = request(for: "/platforms/?limit=\(pageSize)&offset=\(offset)") else {
        return []
    }

    return getPage(with: request)
}

