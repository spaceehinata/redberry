    "use client";

    import React from "react";
    import styles from "./Comments.module.scss";
    import Button3 from "../Buttons/Button3/Button3";

    const Comment = () => {
    return (
        <div className={styles.container}>
        <textarea
            className={styles.textarea}
            placeholder="დააკომენტარე"
        />
        <div className={styles.buttonWrapper}>
            <Button3 text="დააკომენტარე" onClick={() => console.log("დააკომენტარე")} />
        </div>
        </div>
    );
    };

    export default Comment;