function TableCard({ table, onReserve }) {

    return (
        <div className="card p-3">
            <h4>Table {table.tableNumber}</h4>

            <p>
                Capacity: {table.capacity}
            </p>

            <button
                className="btn btn-primary"
                onClick={() => onReserve(table)}
            >
                Reserve
            </button>

        </div>
    );
}

export default TableCard;