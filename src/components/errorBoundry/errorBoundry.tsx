import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    FallBack: ReactNode,

}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    static withErrorBoundry(
        WrappedComponent: React.ComponentType<any>,
        options?: { fallBack: ReactNode }
    ) {
        return (props: any) => (
            <ErrorBoundary FallBack={options?.fallBack}>
                <WrappedComponent {...props} />
            </ErrorBoundary>
        );
    }
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You can log the error to an error reporting service here
        this.setState({ error, errorInfo });
        console.error("Error Boundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI here
            if (this.props.FallBack) return this.props.FallBack;
            return (<div>
                <h2>Something went wrong.</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error?.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                </details>
            </div>);
        }

        return this.props.children;
    }
}



// export const ErrorHandler = {
//     withErrorBoundry: (reactComponent: JSX.Element, options: ErrorBoundryOptions) => {
//         return new ErrorBoundary({ children: reactComponent, FallBack: options.fallBack ?? null })
//     }
// }
export default ErrorBoundary;
