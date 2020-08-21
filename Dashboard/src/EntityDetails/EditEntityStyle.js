import styled from "styled-components"
/** Styling for EditEntity site */
// eslint-disable-next-line import/prefer-default-export
export const Styles = styled.div`
  padding: 1rem;
  
  table {
    width: 100%;
    display: table;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    border-collapse: separate;
    box-sizing: border-box;
    border-spacing: 2px;
    border-color: grey;

    tr {
      border: none;
      background-color: white;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #add8e6;
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
      margin: 0;
      border-bottom: solid 1px #e0e4e8;
      padding: 8px;
    }
    :last-children {
      border-bottom: none;
    }
  }

  tr {
    :last-child {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }

  .entity-info-card-div {
    padding-bottom: 25px;
  }

  .entity-info-card {
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    background-color: rgb(241, 239, 239);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    position: relative;
    padding: 16px;
    border-radius: 4px;
  }

  .entity-info-card-header {
    font-size: 20px;
    margin: 0 16px;
  }

  .entity-info-card-title {
    font-size: 20px;
  }

  .entity-info-card-subtitle {
    color: rgba(0, 0, 0, 0.54);
  }

  .entity-info-card-subtitle,
  entity-info-card-content {
    display: block;
    margin-bottom: 16px;
    font-size: 14px;
  }

  .entity-info-card-content {
    font-size: 14px;
  }

  .page-progression {
    padding-top: 50px;
    text-align: center;
    width: 100%;
    padding-bottom: 25px;
  }

  button {
    font-family: Roboto, "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 0;
    min-width: 0;
    width: 40px;
    border: none;
    background: transparent;
  }

  .back-button {
    color: rgba(0, 0, 0, 0.87);
    background-color: #fff;
  }
  .confirm-button {
    display: inline-block;
    width: 80px;
  }

  .back-button,
  .confirm-button {
    user-select: none;
    cursor: pointer;
    outline: none;
    border: none;
    -webkit-tap-highlight-color: transparent;
    display: inline-block;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: baseline;
    text-align: center;
    margin: 0;
    min-width: 64px;
    line-height: 36px;
    padding: 0 16px;
    border-radius: 4px;
    overflow: visible;
  }

  .undo {
    cursor: pointer;
    float: right;
  }

  button:focus,
  input:focus,
  .undo:focus,
  .edited-field:focus {
    outline: none;
  }

  .initial-state,
  .modified-initial-state {
    display: inline-block;
  }

  .modified-initial-state {
    font-size: 0.75rem;
  }
`