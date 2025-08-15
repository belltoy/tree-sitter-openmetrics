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
    source_file: $ => seq(alias(repeat($.metricfamily), $.metricset), alias($._eof_line, $.eof)),

    metricfamily: $ => prec.right(seq(
      $.type_line,
      optional($.unit_line),
      optional($.help_line),
      alias(repeat($.sample), $.metric),
    )),

    help_line: $ => seq(token("#"), token("HELP"), $.metric_name, alias($._escaped_string, $.metric_help), '\n'),

    type_line: $ => seq(token("#"), token("TYPE"), $.metric_name, $.metric_type, '\n'),

    unit_line: $ => seq(token("#"), token("UNIT"), $.metric_name, alias(/[a-zA-Z_][a-zA-Z0-9_]*/, $.unit), '\n'),

    _eof_line: $ => seq(token("#"), token("EOF"), optional('\n')),

    metric_type: $ => choice(
      "counter",
      "gauge",
      "histogram",
      "gaugehistogram",
      "stateset",
      "info",
      "summary",
      "unknown",
      ),

    sample: $ => seq(
      $.metric_name,
      optional($.label_set),
      $.metric_value,
      optional($.timestamp),
      optional($.exemplar),
      '\n',
    ),

    exemplar: $ => seq(
      token("#"),
      $.label_set,
      $.metric_value,
      optional($.timestamp),
    ),

    metric_name: $ => /[a-zA-Z_:][a-zA-Z0-9_:]*/,

    label_set: $ => seq("{", optional(seq($.label, repeat(seq(",", $.label)), optional(","))), "}"),

    label: $ => seq($.label_name, "=", '"', alias($._escaped_string, $.label_value), '"'),

    label_name: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    metric_value: $ => choice(
      $._realnumber,
      $._inf,
      $._nan,
    ),

    _inf: $ => /[+-]?inf(inity)?/i,
    _nan: $ => /nan/i,

    timestamp: $ => $._realnumber,

    // FIXME:
    _realnumber: $ => /[+-]?([0-9]*[.])?[0-9]+([e][+-]?[0-9]+)?/,

    _escaped_string: $ => /([^\n"\\]|\\["n\\])*/,
  }
});
