[
  (type_line)
  (unit_line)
  (help_line)
] @comment.metric_descriptor

(eof) @comment.eof

(metric_help) @comment.documentation

(exemplar) @comment.exemplar

[
  "TYPE"
  "HELP"
  "UNIT"
  "EOF"
] @keyword

(type_line (type) @type.builtin)

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
