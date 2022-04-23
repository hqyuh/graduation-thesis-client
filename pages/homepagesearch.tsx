import React, { useState } from 'react'
import SearchIcon from '../icons/SearchIcon'
import { InputText } from 'primereact/inputtext'

const HomePageSearch: React.FC = () => {
  const [value, setValue] = useState('')
  return (
    <div className="search-group mx-5">
      <span className="p-input-icon-right">
        <SearchIcon />
        <InputText className="input-search rounded-20" id="righticon" value={value} onChange={(e) => setValue(e.target.value)} />
      </span>
    </div>
  )
}
export default HomePageSearch
