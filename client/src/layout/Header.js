import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
      
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <Link class="navbar-brand" to="/">Ex-Patria</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item">
        <Link class="nav-link" to="/">Persons List</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/persons/add">Add Person
          <span class="sr-only">(current)</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/groups/add">Add Group</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/processes/add">Add Process</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/connect/group-process">Connect Grp-Process</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/connect/entities">Connect Everything</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/category/add">Add New Category</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/object/add">Add New Object</Link>
      </li>
    </ul>
  </div>
</nav>

    )
}

export default Header
