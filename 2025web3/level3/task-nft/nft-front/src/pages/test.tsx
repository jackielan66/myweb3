import Header from "../components/Header"
import { useQuery } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
const query = gql`{
  logMakes {
    id
    maker
    nft_amount
    nft_collection
    nft_tokenId
    orderKey
    price
    saleKind
    salt
    side
  }
}`
const url = 'https://api.studio.thegraph.com/query/109241/my-01/version/latest'
const headers = { Authorization: 'Bearer 674c89e765e754d7fc54ad5ddf41e95e' }
const TestPage = () => {
    // the data is already pre-fetched on the server and immediately available here,
    // without an additional network call
    const { data } = useQuery({
        queryKey: ['data'],
        async queryFn() {
            return await request(url, query, {}, headers)
        }
    })
    return (<>
        <Header />
        <h1>Test Page</h1>
        <div>{JSON.stringify(data ?? {})}</div>
    </>
    )
}


export default TestPage