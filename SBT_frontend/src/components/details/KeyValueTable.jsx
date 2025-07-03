export default function KeyValueTable({ keyValuePairs }) {
    return (
      <table className={`w-full`}>
        <tbody>
          {keyValuePairs.map(([key, value]) => (
            <tr key={key} className=''>
              <th
                scope='row'
                style={{ whiteSpace: 'nowrap' }}
                className={`
                  border text-start align-top
                  font-semibold 
                  py-3 px-6`}
              >
                {key}
              </th>
              <td className='border py-3 px-6 md:px-12'>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }