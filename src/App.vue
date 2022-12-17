<script setup lang="ts">
import { ref } from "vue";
import Vue3BsPaginate from "./components/Vue3BsPaginate.vue";

const currentPage = ref(1);

const onChangePage = (page: number) => {
	console.log(page);
};
</script>

<template>
	<div class="container" style="margin-top: 200px">
		<Vue3BsPaginate
			:total="150"
			v-model="currentPage"
			:perPage="5"
			:onChange="onChangePage"
		/>
	</div>
</template>

<style>
</style>
