/*
  Language: Abc
  Description: Abc Music Notation Language
  Author: NriotHrreion <nriot233@gmail.com>
  Website: https://abcnotation.com
  Category: common
*/
import type {HLJSApi} from "highlight.js";

export default function(hljs : HLJSApi) {
	const untilCommentOrEndOfLine = /(?=[%\n])/

	const inlineHeader = {
		scope: "inline-header",
		begin: /\[[MLQPRIV]:/,
		end: /]/,
		contains: [
			{
				scope: "header-content",
				match: /[^\]]*/,
				endsWithParent: true
			}
		]
	}

	const note = {
		scope: "note",
		match: /[_^]?[_^=]?[A-Ga-gZz][,']*\d*\/*\d*-?/
	}

	const barLine = {
		scope: "bar",
		match: /(\|\]|\|\||\[\||\|:|:\||::|\|)\d*([,\-]\d)*/,
	}

	const tuple = {
		scope: "tuple",
		match: /\([2-9](:[1-9])?(:[1-9])?/
	}

	const graceNotes = {
		scope: "grace",
		begin: /\{/, end: /\}/,
		contains: [
			{
				scope: "note",
				match: /[_^]?[_^=]?[A-Ga-gZz][,']*\d*\/*\d*-?/
			},
		],
	}

	const chord = {
		scope: "chord",	// That is: [Ace]
		begin: /\[/, end: /\]\d*\/*\d*/,
		contains: [
			{
				scope: "note",
				match: /[_^]?[_^=]?[A-Ga-gZz][,']*\d*-?/
			},
		],
	}

	const chordSymbol = {
		scope: "chord-symbol", // That is: "Am"
		begin: '"', end: '"'
	}

	const decoration = {
		scope: "decoration",
		begin: "!", end: "!"
	}
	const decorationShortcut = {
		scope: "decoration",
			match: /[\.\~HLMOPSTuv]/
	}
	const overlay =	{
		scope: "overlay",
		match: /&/
	}

	const comment =	hljs.COMMENT("%", "$")

	const space = {
		scope: "space",
		match: / /
	}
	const error = {
		scope: "error",
		match: /./
	}

	return {
		name: "Abc Notation",
		aliases: ["abc"],
		contains: [
			//
			// header lines and directives (that is, everything except music lines
			//
			{
				scope: "header",
				match: /^[XTCOAMLQPZNGHKRBDFSImrsUVW+]:/
			},
			// content of header lines
			{
				scope: "title",
				match: /(?<=\nT:)[^%\n]*/
			},
			{
				scope: "part",
				match: /(?<=\nP:)[^%\n]*/
			},
			{
				scope: "tempo",
				match: /(?<=\nQ:)[^%\n]*/
			},
			{
				scope: "key",
				match: /(?<=\nK:)[^%\n]*/
			},
			{
				scope: "meter",
				match: /(?<=\nM:)[^%\n]*/
			},
			{
				scope: "voice",
				match: /(?<=\nV:)[^%\n]*/
			},
			{
				scope: "history",
				match: /(?<=\nH:)[^%\n]*/
			},
			{
				scope: "notes",
				match: /(?<=\nN:)[^%\n]*/
			},
			{
				scope: "words",
				match: /(?<=\nW:)[^%\n]*/
			},
			// Everything not enumerated above - don't need separate styles for these.
			{
				scope: "header-content",
				match: /(?<=[XCOALZGRBDFSImrsU]:)[^%\n]*/
			},
			// directives
			{
				// For staves, we want to style the staff information uniquely
				scope: "staves",
				begin: /^%%staves/,
				end: untilCommentOrEndOfLine,
				contains: [
					{
						scope: "staves-content",
						match: /[^%\n]*/,
						endsWithParent: true
					}
				]
			},
			{
				scope: "directive",
				match: /^%%\S+/
			},
			{
				// All other directives just get a simple style
				scope: "directive-body",
				match: /(?<=%%\S+).*/
			},
			// lyrics content
			{
				scope: "lyrics",
				begin: /^w:/,
				end: untilCommentOrEndOfLine,
				contains: [
					{
						scope: "lyrics-content",
						match: /[^%\n]*/,
						endsWithParent: true
					}
				]
			},

			//
			// Music lines
			//

			inlineHeader,
			note,
			barLine,
			tuple,
			graceNotes,
			chord,
			chordSymbol,
			decoration,
			decorationShortcut,
			overlay,
			comment,
			space,

			// slur
			{
				scope: "slur",
				begin: /\(/, end: /\)/,
				contains: [
				 	inlineHeader,
				 	note,
				 	barLine,
				 	tuple,
				 	graceNotes,
				 	chord,
				 	chordSymbol,
				 	decoration,
				 	decorationShortcut,
				 	overlay,
				 	comment,
				 	space,
					{
						scope: "error",
						match: /[^)]/
					}
				]
			},
			error,
		]
	};
}
