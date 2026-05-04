import styles from "./Loader.module.css";

const Loader = ({ size = 16, className = "" }) => {
    return (
        <span
            className={`${styles.loader} ${className}`.trim()}
            style={{ width: size, height: size }}
            aria-hidden="true"
        />
    );
};

export default Loader;
