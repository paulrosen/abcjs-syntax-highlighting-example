<template>
	<div>
		<code-input id="abc" name="abc">{{abcString}}</code-input>
<!--		<textarea id="abc" v-model="abcString" @change="refreshHighlight" @input="refreshHighlight"></textarea>-->
<!--		<pre><code id="highlight-container" v-html="formattedAbc"></code></pre>-->
		<div id="paper"></div>
		<div id="warnings"></div>
	</div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import abcjs from "abcjs";
import highlight from "highlight.js/lib/core"
//@ts-expect-error : no typescript defs found
import highlightAbc from "highlightjs-abc"
//import {CodeInput, templates, registerTemplate} from "@webcoder49/code-input/code-input";
//import "@webcoder49/code-input/code-input"

const abcString = ref(`X:1
M:4/4
L:1/16
%%titlefont Times 22.0
%%partsfont box
%%barnumbers 1
T: Variety of element types
T:This is a subtitle
C: public domain
R: Hit it
A: Yours Truly
S: My own testing
W: Now is the time for all good men
W:
W: To come to the aid of their party.
H: This shows every type of thing that can possibly be drawn.
H:
H: And two lines of history!
Q: "Easy Swing" 1/4=140
P: AABB
%%staves {(PianoRightHand extra) (PianoLeftHand)}
V:PianoRightHand clef=treble+8 name=RH
V:PianoLeftHand clef=bass name=LH
K:Bb
P:A
%%text there is some random text
%%sep 0.4cm 0.4cm 6cm
[V: PianoRightHand] !mp![b8B8d8] f3g !//!f4|!<(![d12b12] !<)![b4g4]|z4  b^f_df (3B2d2c2 B4|1[Q:"left" 1/4=170"right"]!f![c4f4] z4 [b8d8]| (3[G8e8] Tu[c8f8] G8|]
w:Strang- ers
[V: extra] B,16 | "Bb"{C}B,4 ({^CD}B,4 =B,8) |
T:Inserted subtitle
[V: PianoLeftHand] B,6 .D2 !arpeggio![F,8F8A,8]|(B,2 B,,2 C,12)|"^annotation"F,16|[F,16D,16]|Z2|]`)

//const formattedAbc = ref('')

onMounted(async () => {
	highlight.registerLanguage("abc", highlightAbc);
	//@ts-expect-error - codeInput is declared in window
	window.codeInput.registerTemplate("syntax-highlighted", window.codeInput.templates.hljs(highlight, []));

	setTimeout(() => {
		const el = document.querySelector('#abc textarea')
		if (!el) {
			console.log("Error! Can't find the editor on the page")
			return
		}
		//const el = document.querySelector('#abc')
		const editArea = new abcjs.EditArea(el)
		// TODO-PER: Change this to `new abcjs.Editor('#abc textarea', {` after release
		new abcjs.Editor(editArea, {
			canvas_id: "paper",
			warnings_id: "warnings",
			abcjsParams: {}
		});
		// refreshHighlight()
	}, 100)
})

// function refreshHighlight() {
// 	formattedAbc.value = highlight.highlight(abcString.value, { language: "abc" }).value;
// }
</script>

<style>
@import '@webcoder49/code-input/code-input.css';
body {
	font-size: 18px;
}

code-input {
	resize: both;
}

textarea::selection {
	background: red;
	color: #ffffff;
}

pre {
	background: aliceblue;
	padding: 5px;
}
.hljs-keyword {
	color: blue;
}
.hljs-string {
	color: green;
}
.hljs-punctuation {
	font-weight: bold;
}
.hljs-operator {
	background: #dddddd;
}

</style>
