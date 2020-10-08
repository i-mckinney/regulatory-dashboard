import styled from "styled-components"
/** Styling for custom dashboard in admin management site */
// eslint-disable-next-line import/prefer-default-export
export const Styles = styled.div`
  padding: 1rem;
  table {
    width: 100%;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    tr {
      border: none;
      background-color: white;
    }
    tr:hover {
      background-color: #d9dadb;
      .tableCellLink:hover {
        text-decoration: none;
        color: #1f5587;
      }
    }
    th {
      background-color: #2e353d;
      color: white;
    }
    th,
    td {
      border: none;
      margin: 0;
      padding: 0.5rem;
      border-bottom: solid 1px #e0e4e8;
    }
    :last-children {
      border-bottom: none;
    }
  }
  th {
    :last-child {
      border-top-right-radius: 4px;
    }
  }
  th {
    :nth-child(4) {
      text-align: center;
    }
  }
  th {
    :nth-child(3) {
      text-align: center;
    }
  }
  td {
    :nth-child(4) {
      text-align: center;
    }
  }
  td {
    :nth-child(3) {
      text-align: center;
    }
  }
  td {
    :nth-child(2) {
      width: 300px;
    }
  }
  th {
    :first-child {
      border-top-left-radius: 4px;
    }
  }
  tr {
    :last-child {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
  .pagination {
    padding: 0.5rem;
    display: flex;
    vertical-align: middle;
  }
  .paginationButton {
    background-color: #008cba;
    color: white;
    border: none;
    margin-left: 2px;
    margin-right: 2px;
  }
  .paginationPage {
    margin-top: 4px;
    margin-left: 3px;
  }
  .paginationSingleSelector {
    margin-top: 2px;
    margin-left: 3px;
    border: none;
    border-radius: 2px;
  }
  .paginationPageSelector {
    margin-top: 2px;
    margin-left: 3px;
    border-radius: 2px;
    border: none;
    width: 10%;
  }
`
