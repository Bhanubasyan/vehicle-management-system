function Filters({ vehicles, setMakeFilter, setAgingFilter ,setSort }) {
  return (
    <div className="filters">
      
    <select onChange={(e) => setMakeFilter(e.target.value)}>
  <option value="">All Makes</option>

  {[...new Set(vehicles.map(v => v.make))].map((make, index) => (
    <option key={index} value={make}>
      {make}
    </option>
  ))}

</select>

      <label>
        <input
          type="checkbox"
          onChange={(e) => setAgingFilter(e.target.checked)}
        />
        Show Aging Only
      </label>

{/* SORT  */}
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="new">Newest First</option>
        <option value="old">Oldest First</option>
      </select>
    </div>
  );
}

export default Filters;