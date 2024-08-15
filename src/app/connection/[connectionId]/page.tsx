import { getCompany } from '@/actions/companyAction'
import { getUsers } from '@/actions/userAction'
import React from 'react'

interface PageProps {
  params: {
    connectionId: string
  }
}

const Page = async ({params: {connectionId}}: PageProps) => {
  if (Number.isNaN(parseInt(connectionId))) {
    return <div>Invalid connectionId</div>
  }

  const connectionIdNumber = parseInt(connectionId)
  const users = await getUsers(connectionIdNumber)
  const company = await getCompany(connectionIdNumber)
  return (
    <div>{users.map(user =>  <div key={user.id}>{user.name}</div>)}
    {
      company.map(company => <div key={company.id}>{company.name}</div>)
    }
    </div>
  )
}

export default Page