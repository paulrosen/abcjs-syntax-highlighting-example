<template>
	<div>
		<code-input id="abc" name="abc" @change="onChange">{{abcString}}</code-input>
		<div class="output">
			<pre class="elements">{{parsedCode}}</pre>
			<div>
				<div id="paper"></div>
				<div id="warnings"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import abcjs from "abcjs";
import highlight from "highlight.js/lib/core"
//import highlightAbc from "highlightjs-abc"
import highlightAbcParser from "@/highlight-abc-parser"
import codeInput from "@webcoder49/code-input";
import CiHljsTemplate from "@webcoder49/code-input/templates/hljs.mjs";
import {abcString} from "@/abc-string.ts";

const parsedCode = ref('')

onMounted(async () => {
	highlight.registerLanguage("abc", highlightAbcParser);
	codeInput.registerTemplate("syntax-highlighted", new CiHljsTemplate(highlight, []));
	setTimeout(() => {
		const el = document.querySelector('#abc textarea')
		if (!el) {
			console.log("Error! Can't find the editor on the page")
			return
		}
		const editArea = new abcjs.EditArea(el)
		// TODO-PER: Change this to `new abcjs.Editor('#abc textarea', {` after release
		new abcjs.Editor(editArea, {
			canvas_id: "paper",
			warnings_id: "warnings",
			abcjsParams: {}
		});
		dumpStyles()
	}, 100)
})


function onChange() {
	dumpStyles()
}
function dumpStyles() {
	const el = document.querySelector("#abc code")
	if (el) {
		let text = el.innerHTML
		text = text.replace(/<\/span>/g,"</span>\n")
		text = text.replace(/<span/g,"\n<span")
		text = text.replace(/\n+/g, "\n")
		parsedCode.value = text
	}
}
</script>

<style>
@import '@webcoder49/code-input/code-input.css';
@import '@/assets/css/paul-theme.css';

body {
	font-size: 18px;
}

code-input {
	height: 400px;
}

.output {
	display: flex;
}
.elements {
	max-width: 800px;
	max-height: 900px;
	overflow: auto;
}

</style>
