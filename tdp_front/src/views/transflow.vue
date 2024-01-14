<template>  
  <div>  
    <button  
      v-for="item in items"  
      :key="item.id"  
      :class="{ active: selectedItemId === item.id }"  
      @click="selectItem(item.id)"  
    >  
      {{ item.label }}  
    </button>  
  </div>  
</template>  
  
<script>  
import { ref } from 'vue';  
  
export default {  
  setup() {  
    const selectedItemId = ref(null);  
    const items = [  
      { id: 1, label: 'Button 1' },  
      { id: 2, label: 'Button 2' },  
      { id: 3, label: 'Button 3' },  
    ];  
  
    function selectItem(itemId) {  
      selectedItemId.value = itemId;  
    }  
  
    return {  
      selectedItemId,  
      items,  
      selectItem,  
    };  
  },  
};  
</script>  
  
<style>  
.active {  
  background-color: blue;  
  color: white;  
}  
</style>