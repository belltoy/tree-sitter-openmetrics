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

(metric_type) @type.builtin

(metric_unit) @type

(metric_name) @variable

(label_name) @label

((label_name) @attribute.builtin
 (#eq? @attribute.builtin "le"))

(label_value) @string

(metric_value) @number.float

(timestamp) @number.float

[ "{" "}"] @punctuation.bracket

[ "=" ] @operator

[ "," ] @punctuation.comma
