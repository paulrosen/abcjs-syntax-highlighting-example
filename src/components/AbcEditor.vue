<template>
	<div>
		<textarea id="abc"></textarea>
		<div id="paper"></div>
		<div id="warnings"></div>
	</div>
</template>

<script lang="ts" setup>

import {onMounted} from "vue";
import abcjs from "abcjs";

onMounted(() => {
	const el = document.querySelector('#abc')
	const editArea = new abcjs.EditArea(el)
	new abcjs.Editor(editArea, {
		canvas_id: "paper",
		warnings_id: "warnings",
		abcjsParams: {}
	});

})
</script>

<style>

</style>
