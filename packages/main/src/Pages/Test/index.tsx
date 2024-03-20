import React, { useState, useEffect } from 'react';
import styles from './index.module.scss'
const computePlugin = window.$plugin.Computed
const todoPlugin = window.$plugin.Todo

function TestPage(props: any) {
  const [count, setCount] = useState(1)
  const [iptVal, setIptVal] = useState('')
  const [todoList, setTodoList] = useState([])
  const handlePress = (type: string) => {
    computePlugin.setCount(count)
    switch (type) {
      case 'add':
        setCount(computePlugin.handleAdd())
        break;
      case 'minus':
        setCount(computePlugin.handleMinus())
        break;
      default:
        break;
    }
  }
  const handleIptVal = (e) => {
    setIptVal(e.target.value)
  }
  const submit = () => {
    todoPlugin.setList(todoList)
    let listTemp = todoPlugin.addTodo(iptVal)
    listTemp && setTodoList([...listTemp])
    setIptVal('')
  }
  const handleDel = (idx) => {
    todoPlugin.setList(todoList)
    setTodoList([...todoPlugin.delTodo(idx)])
  }
  return (
    <>
      <div className={styles.box}>
        <div className={styles.box_key} onClick={() => handlePress('minus')}>
          <p>-</p>
        </div>
        <h1>{count}</h1>
        <div className={styles.box_key} onClick={() => handlePress('add')}>
          <p>+</p>
        </div>
      </div>
      <div className={styles.todoBox}>
        <div className={styles.todoBox_ipt}>
          <input type="text" value={iptVal} onChange={(e) => {
            handleIptVal(e)
          }}/>
          <button onClick={() => {
            submit()
          }}>提交</button>
        </div>
        <div className={styles.todoBox_list}>
          {
            todoList && todoList.length ? 
            <ul>
              {
                todoList.map((e, idx) => {
                  return <li key={idx}>
                    <p>{e}</p>
                    <button onClick={() => {
                      handleDel(idx)
                    }}>x</button>
                  </li>
                })
              }
            </ul> : <div>暂无数据</div>
          }
        </div>
      </div>
    </>
  )
}
export default TestPage