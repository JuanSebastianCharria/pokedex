const Pagination = ({currentPage, setCurrentPage, totalPages}) => {

    const handlePrevious =  () => {
        if(currentPage !== 1){
            setCurrentPage(currentPage -1)
        }
    
    };
    const handleNext =  () => {
        if (currentPage !== totalPages){
            setCurrentPage(currentPage +1)
        }
        
    };

return (
    <div className="pagination__container">
        <button className="pagination__button" onClick={handlePrevious}>Previous</button>
            <h3 className="pagination"><span className="pagination__value">{currentPage}</span><span className="pagination__slash">/</span> {totalPages}</h3>
        <button className="pagination__button" onClick={handleNext}>Next</button>
    </div>
)
};

export default Pagination;