import React from 'react'
import TodoDetails from '@/components/TodoDetails'

const TodoPage = ({ params }) => {

  return (
    <div>
        <TodoDetails id={ params.id }/>
    </div>
  )
}

export default TodoPage