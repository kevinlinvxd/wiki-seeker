import { useState } from "react"

function App() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [searchInfo, setSearchInfo] = useState({})

  const handleSearch = async e => {
    e.preventDefault()
    if (search === "") return

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`
    const response = await fetch(endpoint)

    console.log(response)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()
    console.log(json)

    setResults(json.query.search)
    setSearchInfo(json.query.searchinfo)
  }
  return (
    <div className="App">
      <header>
        <h1> Wiki Seeker</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="What are you looking for?"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {searchInfo.totalhits ? (
            <p> Search Results: {searchInfo.totalhits} </p>
          ) : (
            ""
          )}
        </form>
      </header>
      <div className="results">
        <div className="result">
          <h3> Title Goes Here</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
            cupiditate.
          </p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default App
