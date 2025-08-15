[
  (type_line)
  (unit_line)
  (help_line)
] @comment.metric_descriptor

(exemplar) @comment.exemplar

[
  "TYPE"
  "HELP"
  "UNIT"
  "EOF"
] @keyword

(metric_type) @type

(metric_name) @variable

(label_name) @label

(label_value) @string

(metric_value) @number.float

(timestamp) @number.float

[ "{" "}"] @punctuation.bracket

[ "=" ] @operator

[ "," ] @punctuation.comma

((label_name) @attribute.builtin
 (#eq? @attribute.builtin "le"))
