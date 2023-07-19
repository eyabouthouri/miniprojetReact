import React, { useState } from 'react';

function Pagination({ currentPage, setCurrentPage, itemsPerPage, totalItems }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a className='page-link' onClick={() => setCurrentPage(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>

     
    </div>
  );
}

export default Pagination;