import React from 'react'
import { InputText } from "primereact/inputtext"
import SearchIcon from "../../icons/SearchIcon"

const Search: React.FC = () => (
      <div className="search-group mx-5">
        <span className="p-input-icon-right">
          <SearchIcon />
          <InputText className="input-search rounded-20" id="righticon" />
        </span>
      </div>
    )
  export default Search