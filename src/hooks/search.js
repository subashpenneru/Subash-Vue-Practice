import { computed, ref, watch } from 'vue';

export default function useSearch(items, searchKey) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(() => {
    let filteredItems = items.value || [];

    if (activeSearchTerm.value) {
      filteredItems = items.value.filter(item =>
        item[searchKey]
          .toLowerCase()
          .includes(activeSearchTerm.value.toLowerCase())
      );
    }

    return filteredItems;
  });

  const updateSearch = val => {
    enteredSearchTerm.value = val;
  };

  watch(enteredSearchTerm, newVal => {
    setTimeout(() => {
      if (newVal === enteredSearchTerm.value) {
        activeSearchTerm.value = newVal;
      }
    }, 300);
  });

  return { enteredSearchTerm, availableItems, updateSearch };
}
