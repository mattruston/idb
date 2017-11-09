//
//  CompaniesBomb.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 11/9/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation

fileprivate let basePath = "https://www.giantbomb.com/api/"
fileprivate let key = "?api_key=db8a1f65f4f0e52e93b1cfebb475d2bebdd92ad1&format=json"


/*
 Name
 Description
 id
 games
 platforms
 gender
 image
 
 */

func downloadBombCompanyInfo() {
    var companies: [[String: Any]] = readInFileData("igdb_companies.json")
    
    for x in 0..<companies.count {
        var company = companies[x]
        if let name = company["name"] as? String {
            print("\(name)")
            
            if let newCompanyData = searchForCompany(company: name) {
                print("Found company")
                
                if let deck = newCompanyData["deck"] as? String, company["description"] == nil {
                    print("Added description")
                    company["description"] = deck
                }
                
                if let images = newCompanyData["image"] as? [String: String], company["logo"] == nil {
                    if let medium = images["medium_url"], let original = images["original_url"] {
                        if !original.contains("2853576-gblogo.png") && !medium.contains("2853576-gblogo.png") {
                            print("Added Image")
                            company["medium_url"] = medium
                            company["original_url"] = original
                        }
                    }
                }
                
                companies[x] = company
            }
        }
    }
    
    do {
        let data = try JSONSerialization.data(withJSONObject: companies, options: .prettyPrinted)
        save(data: data, to: "companies.json")
    } catch {
        print("Failed to convert compaines to data")
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

fileprivate func searchForCompany(company: String) -> [String: Any]? {
    let path = "\(basePath)search/\(key)&query=\(company)".replacingOccurrences(of: " ", with: "%20")
    guard let url = URL(string: path) else {
        return nil
    }
    
    let request = URLRequest(url: url)
    
    var companyData: [String: Any]?
    
    makeSynchronousRequest(request) { (data) in
        do {
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                if let results = json["results"] as? [[String: Any]] {
                    for item in results {
                        if let type = item["resource_type"] as? String, type == "company" {
                            companyData = item
                            return
                        }
                    }
                }
            }
        } catch {
            print("Failed to read in searched data")
        }
    }
    
    return companyData
}


fileprivate func readInFileData(_ file: String) -> [[String: Any]] {
    if let documentDirectoryUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
        let fileUrl = documentDirectoryUrl.appendingPathComponent(file)
        do {
            let data = try Data(contentsOf: fileUrl)
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [[String: Any]] {
                return json
            } else {
                //For some reason something isnt the right type of dictionary, so we want to filter that out
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [Any] {
                    print("Json had: \(json.count)")
                    if let filtered = json.filter({ (item) -> Bool in
                        return item is [String: Any]
                    }) as? [[String: Any]] {
                        print("filtered had: \(filtered.count)")
                        return filtered
                    }
                }
            }
        } catch {
            print(error)
        }
    }
    
    return []
}

//    let allGameIds = getAllGameIds()
//
//    let count = companies.count
//
//    //Super slow, but just needs to run once so its fine
//    for x in 0..<companies.count {
//        var company = companies[x]
//
//        if var games = company["games"] as? [Int] {
//            games = games.filter({ (id) -> Bool in
//                return allGameIds.contains(id)
//            })
//
//            if games.count == 0 {
//                company.removeValue(forKey: "games")
//            } else {
//                company["games"] = games
//            }
//        }
//
//        companies[x] = company
//    }
//
//    //remove all companies without games linked to them
//    companies = companies.filter({ (company) -> Bool in
//        return company["games"] != nil
//    })
//
//    let newCount = companies.count
//
//    print("Removed \(count - newCount) companies")
