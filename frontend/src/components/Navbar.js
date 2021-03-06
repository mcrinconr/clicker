import React from 'react';
import { Link } from 'react-router-dom';

export default function Navebar(props) {
  const {navbar} = props;
  return (
    <Link key={navbar._id} className="brand" to="/">
      {navbar.nombre}
    </Link>
  )
}
