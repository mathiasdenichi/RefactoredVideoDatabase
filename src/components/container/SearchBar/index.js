import React from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css'

const SearchBar = ({ handleSearch }) => (
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
                    <input
                        name='searchText'
                        type="text"
                        className="rmdb-searchbar-input"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>
)

export default SearchBar