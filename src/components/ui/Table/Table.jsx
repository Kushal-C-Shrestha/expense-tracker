import React from 'react'
import styles from './Table.module.css'


const Table = ({ columns, data, footer }) => {
    return (
        <div className={styles["table-wrapper"]}>
            <table className={styles.table}>
                <thead className={styles["table__header"]}>
                    <tr className={styles["table__row"]}>
                        {columns.map((column) => (
                            <th key={column.key} style={{ width: column.width }} className={styles["table__cell"]}>
                                {column.headerRender ? column.headerRender() : column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? <tr><td colSpan={columns.length} className={styles["table__cell"]} style={{ textAlign: 'center' }}> No data found.</td></tr> : (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className={styles["table__row"]}>
                                {columns.map((column) => (
                                    <td key={column.key} className={styles["table__cell"]}>
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot className={styles["table__footer"]}>
                    {footer && footer.columns && (
                        <tr >
                            {footer.columns.map((column) => (
                                <td key={column.key} colSpan={column.colspan} className={styles["table__cell"]}>
                                    {column.label}
                                </td>
                            ))}
                        </tr>
                    )}
                </tfoot>
            </table>
        </div>
    )
}

export default Table