package tree_sitter_openmetrics_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_openmetrics "github.com/belltoy/openmetrics/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_openmetrics.Language())
	if language == nil {
		t.Errorf("Error loading OpenMetrics Text Format grammar")
	}
}
