<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">{{ count }}</button>
  <input type="text" v-model="todo">
  <button class="addTodo" @click="addTodo">add</button>
  <ul><li v-for="(todo, index) in todos" :key="index">{{ todo }}</li></ul>
  <hello msg="123"></hello>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Hello from './Hello.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: { Hello },
  props: {
    msg: String,
  },
  emits: ['send'],
  setup(props, ctx) {
    const count = ref(0)
    const todo = ref('')
    const todos = ref<string[]>([])
    const setCount = () => {
      count.value ++
    }
    const addTodo = () => {
      todos.value.push(todo.value)
      ctx.emit('send', todo.value)
    }
    return { count, todo, todos, setCount, addTodo }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
