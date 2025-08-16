[
  (type_line)
  (unit_line)
  (help_line)
] @comment.metric_descriptor

(help_line
  metric_help: (docstring) @comment.documentation @spell)

(eof) @comment.eof

(exemplar) @comment.exemplar

[
  "TYPE"
  "HELP"
  "UNIT"
  "EOF"
] @keyword

(type_line (type) @type.builtin)

(unit_line (unit) @type)

(sample
  metric_name: (identifier) @variable)

(label
  label_name: (identifier) @property
  label_value: (string) @string)

(label
  label_name: (identifier) @attribute.builtin
 (#eq? @attribute.builtin "le"))

(number) @number

[ "{" "}"] @punctuation.bracket

[ "=" ] @operator

[ "," ] @punctuation.comma
