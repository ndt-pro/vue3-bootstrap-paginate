<script setup lang="ts">
import { toRef, type PropType, computed, useAttrs } from 'vue';

const props = defineProps({
	total: {
		type: Number,
		required: true,
	},
	perPage: {
		type: Number,
		default: 10,
		validator: (value: number) => {
			if (value <= 0) {
				const message = "'perPage' attribute must be greater than 0.";
				console.error(message);
				throw new TypeError(message);
			}
			return true;
		},
	},
	pagesShown: {
		type: Number,
		default: 5,
		validator: (value: number) => {
			const message = "'pagesShown' attribute must be greater than 0.";
			if (value <= 0) {
				console.error(message);
				throw new TypeError(message);
			}
			return true;
		},
	},
	modelValue: {
		type: Number,
		required: true,
		validator: (value: number) => {
			const message = "'v-model' is required and must be greater than 0.";
			if (value <= 0) {
				console.error(message);
				throw new TypeError(message);
			}
			return true;
		},
	},
	size: {
		type: String as PropType<'lg' | 'sm'>,
		default: 'md',
	},
	alignment: {
		type: String as PropType<'center' | 'end'>,
		default: 'start',
	},
	prevContent: {
		type: String,
		default: '‹',
	},
	nextContent: {
		type: String,
		default: '›',
	},
	firstJumpContent: {
		type: String,
		default: '«',
	},
	lastJumpContent: {
		type: String,
		default: '»',
	},
	showPrevNextButton: {
		type: Boolean,
		default: true,
	},
	showJumpButtons: {
		type: Boolean,
		default: false,
	},
	onChange: {
		type: Function,
		default: () => { },
	},
});

const attrs = useAttrs();

const currentPageRef = toRef(props, 'modelValue');
const emit = defineEmits(['update:modelValue']);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const paginate = computed(() => {
	let startPage: number;
	let endPage: number;

	if (totalPages.value <= props.pagesShown) {
		startPage = 1;
		endPage = totalPages.value;
	} else {
		let maxPagesShownBeforeCurrentPage = Math.floor(props.pagesShown / 2);
		let maxPagesShownAfterCurrentPage = Math.ceil(props.pagesShown / 2) - 1;

		if (currentPageRef.value <= maxPagesShownBeforeCurrentPage) {
			startPage = 1;
			endPage = props.pagesShown;
		} else if (currentPageRef.value + maxPagesShownAfterCurrentPage >= totalPages.value) {
			startPage = totalPages.value - props.pagesShown + 1;
			endPage = totalPages.value;
		} else {
			startPage = currentPageRef.value - maxPagesShownBeforeCurrentPage;
			endPage = currentPageRef.value + maxPagesShownAfterCurrentPage;
		}
	}

	let pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

	return {
		total: props.total,
		currentPage: currentPageRef.value,
		itemsPerPage: props.perPage,
		totalPages: totalPages,
		startPage: startPage,
		endPage: endPage,
		pages: pages,
	};
});

const firstPage = computed(() => currentPageRef.value === 1);
const lastPage = computed(() => currentPageRef.value === totalPages.value);

const showFirstPageBreakpoint = computed(() => paginate.value.pages[0] >= 2);
const showLastPageBreakpoint = computed(() => paginate.value.pages[paginate.value.pages.length - 1] < totalPages.value);

const showFirstBreakpoint = computed(() => paginate.value.pages[0] >= 4);
const showLastBreakpoint = computed(() => paginate.value.pages[paginate.value.pages.length - 1] < totalPages.value - 2);

const bindPaginationClass = computed(() => {
	return ['pagination', `pagination-${props.size}`, `justify-content-${props.alignment}`];
});

const onChangePage = (page: number) => {
	if(page === currentPageRef.value || page <= 0 || page > totalPages.value) return;
	
	emit("update:modelValue", page);
  	props.onChange(page);
}

</script>

<template>
	<nav aria-label="..." :class="attrs.class">
		<ul :class="bindPaginationClass">
			<li
				v-if="showJumpButtons"
				class="page-item"
				:class="{ disabled: firstPage }"
			>
				<a
					class="page-link"
					href="#"
					@click.prevent="onChangePage(1)"
					>{{ firstJumpContent }}</a
				>
			</li>
			<li
				v-if="showPrevNextButton"
				class="page-item"
				:class="{ disabled: firstPage }"
				@click.prevent="onChangePage(currentPageRef - 1)"
			>
				<a class="page-link" href="#">{{ prevContent }}</a>
			</li>

			<!-- ... -->
			<li
				v-if="showFirstPageBreakpoint"
				class="page-item"
				@click.prevent="onChangePage(1)"
			>
				<a class="page-link" href="#">1</a>
			</li>

			<li v-if="showFirstBreakpoint" class="page-item">
				<span class="page-link">...</span>
			</li>

			<li
				v-for="(page, index) in paginate.pages"
				:key="index"
				class="page-item"
				:class="{ active: page === currentPageRef }"
				@click.prevent="onChangePage(page)"
			>
				<a class="page-link" href="#">{{ page }}</a>
			</li>

			<li v-if="showLastBreakpoint" class="page-item">
				<span class="page-link">...</span>
			</li>

			<li
				v-if="showLastPageBreakpoint"
				class="page-item"
				@click.prevent="onChangePage(totalPages)"
			>
				<a class="page-link" href="#">{{ totalPages }}</a>
			</li>

			<!-- ... -->

			<li
				v-if="showPrevNextButton"
				class="page-item"
				:class="{ disabled: lastPage }"
				@click.prevent="onChangePage(currentPageRef + 1)"
			>
				<a class="page-link" href="#">{{ nextContent }}</a>
			</li>
			<li
				v-if="showJumpButtons"
				class="page-item"
				:class="{ disabled: lastPage }"
			>
				<a
					class="page-link"
					href="#"
					@click.prevent="onChangePage(totalPages)"
					>{{ lastJumpContent }}</a
				>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
</style>
