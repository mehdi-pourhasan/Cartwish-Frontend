
import './Pagination.css'


// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPosts, postsPerPage, onClick, currentPage }) => {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <>
            {pages.length > 1 && <ul className='pagination'>
                {pages.map(page => (
                    <li key={page}>
                        <button className={parseInt(currentPage) === page ? 'pagination_button active' : 'pagination_button'} onClick={() => onClick(page)}>{page}</button>
                    </li>
                ))}
            </ul>}
        </>
    )
}

export default Pagination