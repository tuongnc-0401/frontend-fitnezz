import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Paginate = ({ page }) => {
    const { numberOfPage } = useSelector(state => state.productList)

    return (
        <Pagination
            count={numberOfPage}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/products?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate