<template>
  <aside
    class="fixed top-16 left-0 w-full sm:w-[30%] lg:w-[20%] h-screen p-6 pt-[6rem] bg-gray-50 shadow-lg text-gray-900 dark:bg-gray-800 dark:text-gray-100 overflow-y-auto"
  >
    <h3 class="font-bold text-xl mb-6 text-blue-600 dark:text-blue-400">
      Filters
    </h3>

    <!-- Sort by Price -->
    <div class="mb-8">
      <h4 class="font-semibold mb-3 text-gray-700 dark:text-gray-300">
        Sort by Price
      </h4>
      <div class="flex flex-col gap-2">
        <label
          for="asc"
          class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
        >
          <input
            type="radio"
            id="asc"
            :checked="sortBy === 'asc'"
            @change="$emit('update:sortBy', 'asc')"
            class="accent-blue-500"
          />
          Ascending
        </label>
        <label
          for="desc"
          class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
        >
          <input
            type="radio"
            id="desc"
            :checked="sortBy === 'desc'"
            @change="$emit('update:sortBy', 'desc')"
            class="accent-blue-500"
          />
          Descending
        </label>
      </div>
    </div>

    <!-- Include Out of Stock -->
    <div class="mb-8">
      <label
        for="includeOutOfStock"
        class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
      >
        <input
          type="checkbox"
          id="includeOutOfStock"
          :checked="includeOutOfStock"
          @change="$emit('update:includeOutOfStock', $event.target.checked)"
          class="accent-blue-500"
        />
        Include Out of Stock
      </label>
    </div>

    <!-- Fast Delivery -->
    <div class="mb-8">
      <label
        for="fastDeliveryOnly"
        class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
      >
        <input
          type="checkbox"
          id="fastDeliveryOnly"
          :checked="fastDeliveryOnly"
          @change="$emit('update:fastDeliveryOnly', $event.target.checked)"
          class="accent-blue-500"
        />
        Fast Delivery Only
      </label>
    </div>

    <!-- Rating -->
    <div class="mb-8">
      <h4 class="font-semibold mb-3 text-gray-700 dark:text-gray-300">
        Rating
      </h4>
      <div class="flex flex-col gap-2">
        <label
          for="rating-4"
          class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
        >
          <input
            type="radio"
            id="rating-4"
            :checked="rating === 4"
            @change="$emit('update:rating', 4)"
            class="accent-blue-500"
          />
          4 Stars & above
        </label>
        <label
          for="rating-3"
          class="flex items-center gap-2 cursor-pointer hover:text-blue-600"
        >
          <input
            type="radio"
            id="rating-3"
            :checked="rating === 3"
            @change="$emit('update:rating', 3)"
            class="accent-blue-500"
          />
          3 Stars & above
        </label>
      </div>
    </div>

    <!-- Clear Filters Button -->
    <button
      @click="$emit('clear-filters')"
      class="w-full py-2 px-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
    >
      Clear Filters
    </button>
  </aside>
</template>

<script>
export default {
  props: {
    sortBy: String,
    includeOutOfStock: Boolean,
    fastDeliveryOnly: Boolean,
    rating: Number,
  },
};
</script>
