import {ref} from 'vue'
import {acceptHMRUpdate, defineStore} from 'pinia'
import type {Post} from "@/types/posts.ts";

export const useArticlesStore = defineStore('articles', () => {
    const articles = ref<Post[]>([]);
    const currentPage = ref<number>(1);
    const totalPage = ref<number>(2);
    const searchQuery = ref<string>('');

    const fetchArticles = async (args) => {
        const {page, search} = args || {};
        const isNewSearchQuery = search !== undefined && search !== searchQuery.value;

        if (isNewSearchQuery) {
            currentPage.value = 1;
            searchQuery.value = search;
        } else {
            currentPage.value = page || currentPage.value;
        }

        try {
            const response = await fetch(`/posts?search=${searchQuery.value}&limit=6&page=${currentPage.value}`);
            if (!response.ok) {
                throw new Error('Posts request error');
            }
            const {data} = await response.json();

            articles.value = data.posts;
            totalPage.value = data.lastPage;
        } catch (err) {
            console.error(err)
        }
    }

    return {articles, totalPage, currentPage, fetchArticles}
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}

