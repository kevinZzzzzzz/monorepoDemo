<template>
  <div class="box">
    <div class="box_key" @click="handlePress('minus')">-</div>
    <h1>{{ count }}</h1>
    <div class="box_key" @click="handlePress('add')">+</div>
  </div>
  <div class="todoBox">
    <div class="todoBox_ipt">
      <input type="text" v-model="iptVal">
      <button @click="submit()">提交</button>
    </div>
    <div class="todoBox_list">
      <ul v-if="todoList.length">
        <li v-for="(item, idx) in todoList" :key="idx">
          <p>{{ item }}</p>
          <button @click="handleDel(idx)">x</button>
        </li>
      </ul>
      <div v-else>暂无数据</div>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Test'
}
</script>
<script setup lang='ts'>
import {ref, getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance() as any

const computePlugin = proxy.$plugin.Computed
const todoPlugin = proxy.$plugin.Todo

const count = ref(0)
const iptVal = ref('')
const todoList = ref([])

const handlePress = (type: string) => {
  computePlugin.setCount(count.value)
  switch (type) {
    case 'add':
      count.value = computePlugin.handleAdd()
      break;
    case 'minus':
      count.value = computePlugin.handleMinus()
      break;
    default:
      break;
  }
}
const submit = () => {
  console.log('iptVal.value', iptVal.value);
  
  todoPlugin.setList(todoList.value)
  let listTemp = todoPlugin.addTodo(iptVal.value)
  listTemp && (todoList.value = listTemp)
  iptVal.value = ''
}
const handleDel = (idx) => {
  todoPlugin.setList(todoList.value)
  let listTemp = todoPlugin.delTodo(idx)
  listTemp && (todoList.value = listTemp)
}
</script>

<style scoped lang="less">
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  &_key {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
    p {
      font-size: 16;
      font-weight: bold;
    }
  }
  h1 {
    margin: 0 10px;
  }
}
.todoBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &_ipt {
    input {
      width: 200px;
      height: 30px;
      border: 1px solid blueviolet;
    }
    button {
      width: 50px;
      height: 30px;
      background-color: blueviolet;
      color: #fff;
      cursor: pointer;
    }
  }
  &_list {
    margin-top: 10px;
    width: 300px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        p {
          width: 100px;
          // border-bottom: 1px solid blueviolet;
        }
        button {
          height: 20px;
          line-height: 00px;
          text-align: center;
        }
      }
    }
  }
}
</style>