/*
  Language: Abc
  Description: Abc Music Notation Language
  Author: NriotHrreion <nriot233@gmail.com>
  Website: https://abcnotation.com
  Category: common
*/
import type {HLJSApi} from "highlight.js";

export default function(hljs : HLJSApi) {
	const accidentalDirectivePrefix = `(?<=%%(propagate|writeout)-accidentals.*)`;
	const fontDirectivePrefix = `(?<=%%(title|subtitle|composer|parts|tempo|gchord|annotation|info|text|vocal|words|set)font.*)`;
	const textDirectivePrefix = `(?<=%%(text|center)\\s)`;

	return {
		name: "Abc Notation",
		aliases: ["abc"],
		contains: [
			// fields
			{
				scope: "meta",
				match: /^[XTCOAMLQPZNGHKRBDFSImrsUVWw+]:/
			},
			// text content in fields
			{
				scope: "meta string",
				match: /(?<=[COAZHBDFS]:).*/
			},
			// title content
			{
				scope: "title",
				match: /(?<=[T]:).*/
			},
			// title content, lyrics content
			{
				scope: "lyrics",
				match: /(?<=[Ww]:).*/
			},
			// notes
			{
				scope: "note",
				match: /[_^=]?[A-Ga-g][,']?\d+/
			},
			// duplets, triplets, quadruplets, etc.
			{
				scope: "operator",
				match: /\([2-9]/
			},
			// chord symbols
			hljs.QUOTE_STRING_MODE,
			// numbers
			hljs.NUMBER_MODE,
			// decorations
			{
				scope: "decoration",
				begin: "!", end: "!"
			},
			// repeat symbols, bar symbols
			{
				scope: "operator",
				match: /(\|\||::|\[?:*\|(:|\[?[1-9])*\]?)/
			},
			{
				scope: "operator",
				match: /\[".+?"/
			},
			// ties, slurs, grace notes, chords, unisons
			{
				scope: "operator",
				match: /(?<!(\w:|%%).*)(-|\(|\)|{|}|\[|\])/
			},
			// macro expressions
			{
				scope: "operator",
				match: "="
			},
			// directives
			{
				scope: "keyword",
				match: /^%%\S+/
			},
			// accidental directives
			{
				scope: "keyword",
				match: new RegExp(accidentalDirectivePrefix +"(not|octave|pitch|none|added|all)")
			},
			// font directives
			{
				scope: "literal",
				match: new RegExp(fontDirectivePrefix +"\\*")
			},
			// text directives
			{
				scope: "chord",
				match: new RegExp(textDirectivePrefix +".*")
			},
			// comments
			hljs.COMMENT("%", "$"),
			// {
			//   scope: "error",
			//   match: new RegExp(/.+/)
			// }
		]
	};
}
