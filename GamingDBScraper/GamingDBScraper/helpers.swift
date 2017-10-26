//
//  helpers.swift
//  GamingDBScraper
//
//  Created by Matthew Ruston on 10/21/17.
//  Copyright © 2017 MattRuston. All rights reserved.
//

import Foundation

fileprivate let basePath = "https://api-2445582011268.apicast.io"
fileprivate let key = "be32cf8f710c797b67940515881e533f"
fileprivate let key2 = "0f4f06eec3715e153e1cf9d135510d21"

func request(for path: String) -> URLRequest? {
    guard let url = URL(string: "\(basePath)\(path)") else {
        print("ERROR: bad path: \(path)")
        return nil
    }
    
    var request = URLRequest(url: url)
    request.addValue(key2, forHTTPHeaderField: "user-key")
    request.addValue("application/json", forHTTPHeaderField: "Accept")
    
    return request
}

func makeSynchronousRequest(_ request: URLRequest, with completion: ((Data)->())?) {
    var semaphore = DispatchSemaphore(value: 0)
    
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
        
        completion?(data)
        
        }.resume()
    
    semaphore.wait()
}


func save(data: Data, to file: String) {
    if let documentDirectoryUrl = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
        let fileUrl = documentDirectoryUrl.appendingPathComponent(file)
        
        do {
            let fileHandle = try FileHandle(forWritingTo: fileUrl)
            fileHandle.seekToEndOfFile()
            
            print("saving data to file...")
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

func filterData(_ data: Data, with filter: ((Any)->(Any)) ) -> Data? {
    do {
        let json = try JSONSerialization.jsonObject(with: data, options: [])
        let filteredJson = filter(json)
        let newData = try JSONSerialization.data(withJSONObject: filteredJson, options: .prettyPrinted)
        return newData
    } catch {
        print("ERROR: \(error)")
    }
    
    return nil
}

func getPage(with request: URLRequest) -> [Int] {
    var ids: [Int] = []
    
    var semaphore = DispatchSemaphore(value: 0)
    
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
            print("ERROR: \(error)")
        }
        
        }.resume()
    
    semaphore.wait()
    
    return ids
}
