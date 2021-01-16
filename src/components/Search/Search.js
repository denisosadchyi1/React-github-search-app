import React, { useContext, useState } from 'react';
import { AlertContext } from '../../context/alert/alertContext';
import { GithubContext } from '../../context/github/githubContext';

const Search = () => {
  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const github = useContext(GithubContext)

  const onSubmit = (key) => {
    if(key !== 'Enter') {
      return
    }

    github.clearUsers()

    if(value.trim()) {
      alert.hide()
      github.search(value.trim())
    }else{
      alert.show('Pls enter user username!')
    }
  }
  return (
    <div>
      <input 
        type="text"
        className="form-control"
        placeholder="Enter user username"
        onKeyPress={(e) => onSubmit(e.key)}
        onChange={(e) => setValue(e.target.value)}/>
    </div>
  )
}

export default Search;