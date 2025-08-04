import React from 'react'
import TodoDetails from '@/components/TodoDetails'

const TodoPage = async ({ params }) => {

  // fix: await params before getting its props
  const { id } = await params;

  return (
    <div>
        <TodoDetails id={ id }/>
    </div>
  )
}

export default TodoPage