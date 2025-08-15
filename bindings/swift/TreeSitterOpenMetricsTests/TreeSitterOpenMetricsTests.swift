import XCTest
import SwiftTreeSitter
import TreeSitterOpenmetrics

final class TreeSitterOpenmetricsTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_openmetrics())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading OpenMetrics Text Format grammar")
    }
}
