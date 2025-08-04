import React from 'react'
import TodoDetails from '@/components/TodoDetails'

const TodoPage = async ({ params }) => {

  return (
    <div>
        <TodoDetails id={ params.id }/>
    </div>
  )
}

export default TodoPage