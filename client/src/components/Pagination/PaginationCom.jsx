/* eslint-disable react/prop-types */

import { Pagination } from 'antd';

const PaginationCom = ({ limitPage, setPages, pages, totalCount }) => {

    const onChangeHandler = (page) => {
        setPages(page)
    }
    return <Pagination defaultCurrent={pages} onChange={onChangeHandler} total={limitPage === 6 ? totalCount <= 6 ? totalCount : (totalCount + (limitPage * 2)) : totalCount} />
}

// 6

export default PaginationCom;