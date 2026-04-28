import React from 'react'
import styles from "./StatCard.module.css"
import { ArrowUp, ArrowDown } from "lucide-react"

const StatCard = ({ title, value, indicatorValue, indicator, icon }) => {

    const mapColorToIcon = (title) => {
        switch (title) {
            case "Total expenses":
                return "red";
                break;
            case "Total transactions":
                return "blue";
                break;
            case "This month":
                return "green";
                break
            case "This week":
                return "orange";
                break;
            default:
                return "gray";
                break;
        }
    }

    return (
        <div className={styles["stat-card"]}>
            {icon && <div className={`${styles["stat-card__icon"]} ${styles[`icon--${mapColorToIcon(title)}`]}`}>{icon}</div>}
            <div className={styles["stat-card__content"]}>
                <h3 className={styles["stat-card__title"]}>{title}</h3>
                <div className={styles["stat-card__value"]}>
                    <p>{value}</p>
                    {indicatorValue && (
                        <div className={styles["stat-card__indicator"]}>
                            <span className={styles[`indicator--${indicator}`]}>
                                {indicatorValue.replace("-", "")}
                            </span>
                            {indicator === "up" && <ArrowUp className={`${styles[`indicator--up`]} ${styles['indicator__icon']}`} />}
                            {indicator === "down" && <ArrowDown className={`${styles[`indicator--down`]} ${styles['indicator__icon']}`} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StatCard