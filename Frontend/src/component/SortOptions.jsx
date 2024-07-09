const SortOptions = ({ handleSortByName, handleSortByPrice }) => {
  return (
    <div>
      <select
        onChange={(e) => {
          const selectedOption = e.target.value;
          if (selectedOption === "name") {
            handleSortByName();
          } else if (selectedOption === "price") {
            handleSortByPrice();
          }
        }}
        className="py-1 px-3 rounded border"
      >
        <option value="name">Urutkan Berdasarkan Nama</option>
        <option value="price">Urutkan Berdasarkan Harga</option>
      </select>
    </div>
  );
};

export default SortOptions;
