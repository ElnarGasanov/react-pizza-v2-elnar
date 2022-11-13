import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
    <ContentLoader className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="142" r="125" />
        <rect x="0" y="291" rx="0" ry="0" width="280" height="34" />
        <rect x="0" y="337" rx="10" ry="10" width="280" height="69" />
        <rect x="0" y="422" rx="6" ry="6" width="99" height="39" />
        <rect x="103" y="418" rx="20" ry="20" width="178" height="42" />
    </ContentLoader>
)

export default PizzaSkeleton
