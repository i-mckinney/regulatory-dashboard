import React from 'react';

/**
*  @param {boolean}canPreviousPage: Bool If there are pages and the current pageIndex is greater than 0, this will be true
*  @param {array}canNextPage: If there are pages and the current pageIndex is less than pageCount, this will be true
*  @param {array}pageOptions: Array<Int> An array of zero-based index integers corresponding to available pages in the table. 
*   This can be useful for generating things like select interfaces for the user to select a page from a list,
*   instead of manually paginating to the desired page.
*  @param {array}pageCount: Integer
*  @param {array}gotoPage
*  @param {array}nextPage
*  @param {array}previousPage: Integer 
*  @param {array}setPageSize: Integer 
*  @param {array}pageIndex: Integer
*  @param {array}pageSize: Integer **/

function TablePagination({ 
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize
 }) {

  return (
    <>
      {/**Pagination component */}
      <div className="pagination mb-2 mt-1">
        <button className="paginationButton" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button className="paginationButton" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button className="paginationButton" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button className="paginationButton" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span className="paginationPage">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span >
          | Go to page:
          <input
            className="paginationSingleSelector"
            type="number"
            defaultValue={pageIndex + 1}
            min="1"
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          className="paginationPageSelector"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default TablePagination;