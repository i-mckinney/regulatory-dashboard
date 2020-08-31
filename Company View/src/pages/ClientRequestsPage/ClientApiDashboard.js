import React from 'react';
import ClientApiTable from '../../components/api-table/ClientApiTable';
import { Styles } from '../../components/api-table/ApiTableStyle';

/** @return {JSX} Returns the a table that displays Client Api Request data
 */

function ClientApiDashboard() {
  /** useMemo is a React hook that memorizes the output of a function.
   * It's important that we're using React.useMemo here to ensure that our data isn't recreated on every render.
   * If we didn't use React.useMemo, the table would think it was receiving new data on every render
   * and attempt to recalulate a lot of logic every single time. Only when the memoized value actually changes, it re renders
   * Header -> Represents what is shown in the table
   * Accessor -> represents key that you look for in a given data
   * Filter -> choosing which filter to use.
   * filter -> includes (tells react table to show values that matches the value in the select field)
   * Filter not given -> will use global filter
   * */
  const columns = React.useMemo(() => [
    {
      Header: 'Request Name',
      accessor: 'RequestName',
    },
    {
      Header: 'METHOD',
      accessor: 'RequestMethod',
    },
    {
      Header: 'Request URL',
      accessor: 'RequestUrl',
    },
    {
      Header: 'Description',
      accessor: 'RequestDescription',
    },
    {
      Header: 'Action',
      accessor: 'Action',
    },
  ]);
  const mockData = [
    {
      RequestName: 'Login - OAuth',
      RequestMethod: 'POST',
      RequestUrl: 'https://reg-dashboard-api.helixcp.com/',
      RequestDescription: 'login with provided OAuth token',
      Action: 'edit | delete',
    },
    {
      RequestName: 'Change List',
      RequestMethod: 'GET',
      RequestUrl:
        'https://reg-dashboard-api.helixcp.com/api/ChangeRequest?pageSize=0&pageNumber=0',
      RequestDescription: 'Retrieve list of requested changes',
      Action: 'edit | delete',
    },
    {
      RequestName: 'Entities List',
      RequestMethod: 'GET',
      RequestUrl:
        'https://reg-dashboard-api.helixcp.com//api/Entity?pageSize=0&pageNumber=0',
      RequestDescription: 'Retrieve list of entities',
      Action: 'edit | delete',
    },
    {
      RequestName: 'Loan List',
      RequestMethod: 'GET',
      RequestUrl:
        'https://reg-dashboard-api.helixcp.com/api/Loan?pageSize=20&pageNumber=0',
      RequestDescription: 'Retrieve list of loans',
      Action: 'edit | delete',
    },
    {
      RequestName: 'Make a Change Request',
      RequestMethod: 'POST',
      RequestUrl: 'https://reg-dashboard-api.helixcp.com/api/ChangeRequest',
      RequestDescription: 'Make a change request',
      Action: 'edit | delete',
    },
  ];

  /** setting custom cells for each specific columns while creating rows for the dashboard */
  const customRow = (cell) => {
    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
  };

  return (
    <div>
      <h4 className='mt-1 ml-4'>API Dashoard</h4>
      <Styles>
        <ClientApiTable
          columns={columns}
          data={mockData}
          customRowRender={customRow}
          destinationString='reports'
        />
      </Styles>
    </div>
  );
}

export default ClientApiDashboard;
