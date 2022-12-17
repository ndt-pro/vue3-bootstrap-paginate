# Vue3 Bootstrap Paginate

#### Vue3 Bootstrap Paginate is a paging library for VueJS that uses bootstrap's style.

![With Bootstrap 3](https://res.cloudinary.com/ndtpro/image/upload/v1671209654/projects/github/vue3-bootstrap-paginate-3_w0l4th.png)

![With Bootstrap 4,5](https://res.cloudinary.com/ndtpro/image/upload/v1671209654/projects/github/vue3-bootstrap-paginate-45_ylnw7p.png)


[![ndt-pro - vue3-bootstrap-paginate](https://img.shields.io/static/v1?label=ndt-pro&message=vue3-bootstrap-paginate&color=yellow&logo=github)](https://github.com/ndt-pro/vue3-bootstrap-paginate "Go to GitHub repo")
[![npm version](https://img.shields.io/npm/v/vue3-bootstrap-paginate.svg)](http://badge.fury.io/js/vue3-bootstrap-paginate) [![npm downloads](https://img.shields.io/npm/dm/vue3-bootstrap-paginate.svg)](http://badge.fury.io/js/vue3-bootstrap-paginate) [![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/ndt-pro/vue3-bootstrap-paginate/blob/main/LICENSE)

---

## :cd: Installation

-   npm: `npm i vue3-bootstrap-paginate`

## Usage

You can import and register the component globally in your main.js, or import and use it in a particular component.

**Vue2: To register in your `main.js`**

```javascript
import Vue from 'vue';
// Import the component
import { Vue3BsPaginate } from 'vue3-bootstrap-paginate';

// Register the component globally
Vue.component('Vue3BsPaginate', Vue3BsPaginate);
```

**Vue3: To register in your `main.js`**

```javascript
import { createApp } from 'vue';

// Import the component
import { Vue3BsPaginate } from 'vue3-bootstrap-paginate';

const app = createApp({});

// Register the component globally
app.component('Vue3BsPaginate', Vue3BsPaginate);
```

**To register in your component**

```vue
<script>
	import Vue3BsPaginate from 'vue3-bootstrap-paginate';
	export default {
		components: { Vue3BsPaginate },
	};
</script>
```

**Using in your `.vue` file**

```vue
<template>
	<Vue3BsPaginate
		:total="150"
		v-model="currentPage"
		:perPage="10"
		:onChange="onChangePage"
		alignment="center"
	/>
</template>
```

## API

### Props

| Prop | Type | Default | Options | Description |
| ------ | ------ | ------ | ------ | ------ |
| total | Number | required | | Total number of items that you want to paginate |
| perPage | Number | 10 | | Total number of items that you explicitly want to show per one page |
| pagesShown | Number | 5 | | Maximum pagination page to be shown |
| v-model | Number | required | | Current active page |
| size | String | 'md' | 'lg','sm' | Size of button according to bootstrap |
| alignment | String | 'start' | 'center','end' | Align the position of the pagination |
| prevContent | String | '‹' | | Content of previous button |
| nextContent | String | '›' | | Content of next button |
| firstJumpContent | String | '«' | | Content of jump to first button |
| lastJumpContent | String | '»' | | Content of jump to last button |
| showPrevNextButton | Boolean | true | | Show previous and next button |
| showJumpButtons | Boolean | false | | Show jump to first and last button |
| onChange | Function | () => { } | | A function that runs when the user changes a page by clicking any of the elements of the component (Passing the new active page to the function as a parameter) |

## Project setup

### Install dependencies

-   npm: `npm install`

### Start Dev Server

-   npm: `npm run serve`

### Compiles and minifies for production

-   npm: `npm run build`
