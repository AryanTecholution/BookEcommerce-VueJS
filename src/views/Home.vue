<template>
  <div class="flex">
    <!-- Sidebar -->
    <div class="flex min-h-screen w-screen">
      <div class="min-w-[20%]"><SidebarFilters /></div>
      <!-- Main Content -->
      <main class="flex-1 border-2 border-green-400 w-screen">
        <ProductList />
      </main>
    </div>
  </div>
</template>
<script>
import SidebarFilters from "../components/SidebarFilters.vue";
import ProductList from "../components/ProductList.vue";
import HelloWorld from "../components/HelloWorld.vue";
export default { components: { SidebarFilters, ProductList } };
</script>
<style></style>
