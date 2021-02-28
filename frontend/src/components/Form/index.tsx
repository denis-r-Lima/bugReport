import React from 'react'

// import { Container } from './styles';

const Form: React.FC = () => {
  return (
      <form onSubmit={(e) => { e.preventDefault() }}>
          <label htmlFor="Title">Bug title:</label>
          <input type="text" name="Title"/>
          <label htmlFor="Desciption"> Bug Description</label>
          <textarea name="Description" id="description" cols={30} rows={10}></textarea>
      </form>
  )
}

export default Form
