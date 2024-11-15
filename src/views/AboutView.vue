<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="min-w-[20%] bg-gray-200 p-4">
      <SidebarFilters />
    </div>
  </div>
</template>

<script>
import SidebarFilters from "../components/SidebarFilters.vue";

export default {
  name: "AboutView",
  components: { SidebarFilters },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
