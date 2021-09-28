import React from 'react';
import { Pagination } from '@material-ui/lab';

function MyPagination({ pageCount, onChangePage, defaultPage = 1 }) {
	return (
		<Pagination
			className="flex-shrink-0 border-t-1 p-10 m-t-10 m-b-10 right"
			count={pageCount}
			defaultPage={defaultPage}
			siblingCount={0}
			onChange={onChangePage}
		/>
	);
}

export default MyPagination;
