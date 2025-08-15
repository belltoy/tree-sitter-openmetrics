/**
 * @file OpenMetrics text format
 * @author Zhongqiu Zhao <belltoy@gmail.com>
 * @license MIT
 */

// See https://github.com/prometheus/OpenMetrics/blob/main/specification/OpenMetrics.md#text-format
//
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "openmetrics",

  extras: ($) => [' '],

  rules: {
    source_file: $ => seq(repeat($._line), $.eof),

    _line: $ => choice(
      $.sample,
      $.help_line,
      $.type_line,
      $.unit_line,
    ),

    help_line: $ => seq(
      token("#"),
      token("HELP"),
      field("metric_name", $._metric_name),
      alias($._escaped_string, $.metric_help),
      '\n'
    ),

    type_line: $ => seq(
      token("#"),
      token("TYPE"),
      field("metric_name", $._metric_name),
      $._metric_type,
      '\n'
    ),

    unit_line: $ => seq(token("#"),
      token("UNIT"),
      field("metric_name", $._metric_name),
      alias(/[a-zA-Z_][a-zA-Z0-9_]*/, $.metric_unit),
      '\n'
    ),

    eof: $ => seq(token("#"), token("EOF"), optional('\n')),

    _metric_type: $ => alias(choice(
      "counter",
      "gauge",
      "histogram",
      "gaugehistogram",
      "stateset",
      "info",
      "summary",
      "unknown",
    ), $.type),

    sample: $ => seq(
      field("metric_name", $._metric_name),
      optional($.label_set),
      field("metric_value", $._metric_value),
      field("timestamp", optional($._timestamp)),
      optional($.exemplar),
      '\n',
    ),

    exemplar: $ => seq(
      token("#"),
      $.label_set,
      field("metric_value", $._metric_value),
      field("timestamp", optional($._timestamp)),
    ),

    _metric_name: $ => alias(/[a-zA-Z_:][a-zA-Z0-9_:]*/, $.identifier),

    label_set: $ => seq("{", optional(seq($.label, repeat(seq(",", $.label)), optional(","))), "}"),

    label: $ => seq(
      field("label_name", alias($._label_name, $.identifier)),
      "=",
      field("label_value", alias($._label_value, $.string)),
    ),

    _label_value: $ => seq('"', $._escaped_string, '"'),

    _label_name: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    _metric_value: $ => alias(choice(
      $._realnumber,
      $._inf,
      $._nan,
    ), $.number),

    _inf: $ => /[+-]?inf(inity)?/i,
    _nan: $ => /nan/i,

    _timestamp: $ => alias($._realnumber, $.number),

    // FIXME:
    _realnumber: $ => /[+-]?([0-9]*[.])?[0-9]+([e][+-]?[0-9]+)?/,

    _escaped_string: $ => /([^\n"\\]|\\["n\\])*/,
  }
});
