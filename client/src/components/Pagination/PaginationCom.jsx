/* eslint-disable react/prop-types */

import { Pagination } from 'antd';

const PaginationCom = ({ limitPage, setPages, pages, totalCount }) => {

    const onChangeHandler = (page) => {
        setPages(page)
    }
    return <Pagination defaultCurrent={pages} onChange={onChangeHandler} total={limitPage === 6 ? (totalCount + (limitPage * 2)) : totalCount} />
}

export default PaginationCom;