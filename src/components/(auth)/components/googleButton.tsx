import React from 'react'
import styles from "./google.module.css"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

const GoogleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function GoogleButton(props, ref) {
        return (
            <button {...props} ref={ref}
                className={styles["login-with-google-btn"]}>
                Sign in with Google
            </button>
        )
    }

)

export default GoogleButton